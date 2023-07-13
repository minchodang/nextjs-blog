# 1. 요약 및 참고 사항. 

- 구현 배포 url: https://nextjs-blog-kappa-two-92.vercel.app/

- 기본적으로 ui 및 추가 기능은 추후 추가 개발 예정.

# 2. 구현 요구 사항. 


### 과제) Next.js로 마크다운 블로그 만들기 (1/2)

<aside>
💡 Next.js로 마크다운으로 작성한 블로그를 정적 페이지(SSG)로 작성해주세요.

</aside>

**:: 폴더 구조 및 라우팅**

- 사용자는 루트 경로의 `__posts` 폴더에 작성된 마크다운 파일(`.md`)를 작성할 수 있어야 합니다. 해당 파일은 마크다운 본문과 게시물에 대한 meta data를 담을 수 있어야 합니다. 아래는 마크다운에 jekyll에서 만든 `frontmatter`라는 문법([링크](https://jekyllrb.com/docs/front-matter/))을 적용한 예시입니다.
    
    ```markdown
    ---
    categories:
      - Development
      - VIM
    date: "2012-04-06"
    description: 설명을 적는 곳입니다
    slug: spf13-vim-3-0-release-and-new-website
    tags:
      - .vimrc
      - plugins
      - spf13-vim
      - vim
    title: hello
    ---
    
    ## 예시입니다
    - 예시입니다
    ```
    
- 블로그에 작성된 게시물을 렌더링하는 `목록 페이지`와 개별 게시물을 렌더링하는 `상세 페이지`로 나누어 작성해주세요.
    - `/` - 목록 페이지
    - `/[id]` - 상세 페이지
    - 마크다운을 JavaScript로 변환해주는 도구는 `remark`(마크다운 Parser), `remark-html`(remark로 파싱한 데이터를 html로 변환) 을 참고
    - 각 마크다운의 meta data는 `gray-matter`, `frontmatter` 참고
    - 마크다운을 React에 삽입할 때는 `dangerouslySetInnerHTML` 을 사용 ([참고 링크](https://ko.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml))
    - (추가 구현) 코드 하이라이터는 `highlight.js`, `prism.js` 를 참고

**:: Next.js 12에서 지원하는 Prefetching 메서드를 적절히 사용해주세요.**

- Next.js 13을 설치하고 Pages Router를 사용하셔도 됩니다.
- 정적 페이지를 생성할 때 필요한 데이터 생성 → `getStaticProps`
- 각 포스트를 그려줄 상세 페이지 경로를 생성  → `getStaticPaths`



# 2. 구현 내용. 

## 1) 마크 다운 가져오는 api.

```ts
// 마크다운 디렉토리 가져오기.
const postsDirectory = join(process.cwd(), '_posts');

// 마크다운 파일 읽기. 
export const getPostSlugs = () => {
    return fs.readdirSync(postsDirectory);
};

// 마크다운 파일명으로 특정 포스팅 읽어오기. 
export const getPostBySlug = ({ slug, fields = [] }: PostSlugType) => {
    // 아래는 파일 구조 읽고 가져오는 구조. 
    const realSlug = slug?.replace(/\.md$/, '');
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    // matter 함수 사용해서 js화.
    const { data, content } = matter(fileContents);
    const items: Items = {};

    // field 값에 따라 아이템 객체에 데이터 넣어주기. 
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug;
        }
        if (field === 'content') {
            items[field] = content;
        }

        if (typeof data[field] !== 'undefined') {
            items[field] = data[field];
        }
    });
    return items;
};

// 모든 포스트 가져오기.
export const getAllPosts = (fields: string[] = []) => {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug({ slug, fields }))
//시간 순 설정. 
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
};

```
2) 마크다운 html 변경.
```ts
import { remark } from 'remark';
import html from 'remark-html';

const markdownToHtml = async (markdown: string) => {
    const result = await remark().use(html).process(markdown);
    return result.toString();
};

export default markdownToHtml;

```
3) highlightCodeInHTML

react-markdown 라이브러리 없이 코드 하이라이트 처리 적용 훅스.
기본적인 구조는 돔 파서로 html 파일 받고 그 이후, 코드 블록만 골라서 highlightAuto 적용 후 다시 html 반환. 
여기서 중요한 점은 DomParser는 ssr단에서 사용불가.
즉, 브라우저 dom을 조작하는 부분이라서 이 부분은 useEffect에 담아서 사용해야 오류가 안남.


```ts
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';

const highlightCodeInHTML = (htmlString: any) => {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(htmlString, 'text/html');
    const codeBlocks = doc.querySelectorAll('pre code');

    codeBlocks.forEach((codeBlock) => {
        if (!codeBlock.textContent) {
            return;
        }
        const result = hljs.highlightAuto(codeBlock.textContent);
        codeBlock.innerHTML = result.value;
        codeBlock.classList.add('hljs');
    });

    return doc.documentElement.innerHTML;
};

export { highlightCodeInHTML };
```

## 2) 페이지단 처리.

기본적으로 페이지 단 처리는 정적 페이지 생성을 위해 getStaticProps로 데이터 가져오고 프롭으로 내려주는 구조. 
링크 처리로 디테일 포스팅으로 이동. 

### 1. main페이지. 
```tsx
const Home = ({ allPosts }: Props) => {
    console.log(allPosts);

    return (
        <Container>
            <h1>All Posts</h1>
            {allPosts.map((value) => (
                <Link as={`/${value.slug}`} href={`/[id]`}>
                    <div>{value.title}</div>
                </Link>
            ))}
        </Container>
    );
};

export default Home;

export const getStaticProps = async () => {
    const allPosts = getAllPosts(['title', 'date', 'slug', 'author', 'coverImage', 'excerpt']);
    return {
        props: { allPosts },
    };
};

```

### 2. [id] 페이지. 
id 페이지 역시, 기본적인 구조는 동일.
다만, getStaticPaths 설정.

어떤 path들에 대해서 정적 페이지 생성을 할지 정하는 getStaticPaths 함수는 반환 객체로 paths 키와 fallback 키를 반드시 포함시켜야한다.

fallback
빌드 타임에 생성해놓지 않은 path로 요청이 들어온 경우 어떻게 할지 정하는 boolean 또는 'blocking' 값이다.

false인 경우

getStaticPaths가 반환하지 않은 모든 path에 대해서 404 페이지를 반환한다.

아래와 같은 경우에 사용할 수 있다

적은 숫자의 path만 프리렌더링 해야하는 경우
새로운 페이지가 추가 될 일이 많지 않은 경우
→ 새로운 페이지가 자주 추가 된다면, 추가될때마다 다시 빌드해줘야한다. 다만 블로그 페이지라서 false로 설정. 

```tsx
const DetailPage = ({ post }: Props) => {
    return <PostBody content={post.content} />;
};

export default DetailPage;

export async function getStaticProps({ params }: Params) {
    const post = getPostBySlug({
        slug: params.id,
        fields: ['title', 'date', 'slug', 'author', 'content', 'ogImage', 'coverImage'],
    });
    const content = await markdownToHtml(post.content || '');

    return {
        props: {
            post: {
                ...post,
                content,
            },
        },
    };
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug']);

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    id: post.slug,
                },
            };
        }),
        fallback: false,
    };
}


```
### 3. 포스트바디 컴포넌트 

언급한 것처럼, useEffect 안에서 설정해서 csr 환경에서 코드 하이라이팅 적용한 html 반환 후, 반환 값을 innerHtml로 넣어줌. 

 ```tsx
const PostBody = ({ content }: Props) => {
    const [highlightedContent, setHighlightedContent] = useState(content);

    useEffect(() => {
        import('./../util/highlightCodeInHTML').then(({ highlightCodeInHTML }) => {
            setHighlightedContent(highlightCodeInHTML(content));
        });
    }, []);
    return (
        <Container>
            <div dangerouslySetInnerHTML={{ __html: highlightedContent }} />
        </Container>
    );
};



```


# 4. 느낀점. 

- 이번 과제를 하면서도 많은 부분을 배울 수 있었고, 이전에도 blog 구현한 적은 있지만, 그때 보다 더 구조나 원리에 대해 많이 배운거 같다.
- 추가로 아직 미완성이라서 추후 계속 보충하고 내 블로그도 새롭게 꾸미고 전환해서 옮겨야겠다.
- 남은 기능으로는 ui 추가 및 서치 기능 , seo 메타 설정 등이 생각난다.  
 
**:: 참고 사항**

- 가급적 TypeScript로 진행하시는 걸 추천드립니다.
- 과제의 목적이 디자인에 있지는 않기 때문에 UI 관련 라이브러리는 자유롭게 사용하셔도 좋습니다. 단, 라이브러리의 종류와 Next.js 간 호환이 잘 맞지 않아 에러가 발생하는 경우가 있을 수 있으니 유의하여 사용해주세요.
- CSS-in-JS 라이브러리 사용 시 `_document.js`(Next.js 공식 문서 참고)에 각 라이브러리(`styled-components`, `emotion`, …)에 알맞은 세팅을 추가해주세요.
- (선택) [Vercel](https://vercel.com/)이나 [Netlify](https://www.netlify.com/)를 활용하면 정적 페이지를 간단하게 배포할 수 있습니다.
- 과제 완료 후 과제 제출 스레드에 해당 프로젝트의 github 링크로 제출해주세요. 프로젝트에 대한 간단한 소개가 README에 작성되어 있으면 좋습니다.
- 이 외에 추가 구현하고 싶은 기능이 있으면 자유롭게 구현해주세요.
