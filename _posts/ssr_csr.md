---
title: '웹 애플리케이션의 렌더링 방식: SSR, CSR, MPA, SPA 비교'
excerpt: '웹 애플리케이션 구축 방식과 렌더링 방식의 이해를 돕기 위해 서버 사이드 렌더링(SSR), 클라이언트 사이드 렌더링(CSR), 멀티 페이지 애플리케이션(MPA), 싱글 페이지 애플리케이션(SPA)의 개념과 특징을 비교해드립니다. 이해를 돕기 위해 코드 예시와 이미지를 추가로 제공합니다.'
coverImage: 'https://www.xenonstack.com/hubfs/xenonstack-rendering-web-page%20.png'
date: '2023-07-02T10:00:00.000Z'
author:
    name: 08베이식
    picture: '/public/beisik.png'
ogImage:
    url: 'https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1284004/regular_1708x683_cover-client-side-vs-server-side-pre-rendering-b43c48127da106c356a983d35f6d8039.png'
---

# 웹 애플리케이션의 렌더링 방식: SSR, CSR, MPA, SPA 비교

웹 애플리케이션의 구축 방식과 렌더링에는 여러 가지 접근 방법이 있습니다. 이번 글에서는 서버 사이드 렌더링(SSR), 클라이언트 사이드 렌더링(CSR), 멀티 페이지 애플리케이션(MPA), 싱글 페이지 애플리케이션(SPA)의 개념과 특징을 비교해드리겠습니다. 이해를 돕기 위해 코드 예시와 이미지를 포함하였습니다.

![web-rendering](https://bs-uploads.toptal.io/blackfish-uploads/components/blog_post_page/content/cover_image_file/cover_image/1284004/regular_1708x683_cover-client-side-vs-server-side-pre-rendering-b43c48127da106c356a983d35f6d8039.png)

## 1. 서버 사이드 렌더링 (SSR)

서버 사이드 렌더링은 웹 페이지를 서버에서 HTML로 렌더링하여 클라이언트에 전달하는 방식입니다. 사용자가 요청한 웹 페이지를 서버에서 완전히 렌더링하고, 브라우저가 클라이언트에게 완성된 HTML 페이지를 전달합니다.

### 장점

-   초기 로딩 속도가 빠름
-   SEO 친화적

### 단점

-   서버 부하 증가
-   사용자 인터랙션 대기 시간이 길어짐

### 코드 예시

```javascript
app.get('/', (req, res) => {
    res.send(`
    <html>
      <head>
        <title>SSR Example</title>
      </head>
      <body>
        <h1>Hello, Server Side Rendering!</h1>
      </body>
    </html>
  `);
});
```

## 2. 클라이언트 사이드 렌더링 (CSR)

클라이언트 사이드 렌더링은 브라우저에서 JavaScript를 사용하여 웹 페이지를 동적으로 렌더링하는 방식입니다. 서버에서는 기본 HTML, CSS, JavaScript 파일만 전달하고, 필요한 데이터가 있을 경우 AJAX를 통해 서버에서 데이터를 받아와 브라우저에서 렌더링합니다.

### 장점

-   사용자 인터랙션 대기 시간이 짧아짐
-   서버 부하 감소

### 단점

-   초기 로딩 속도가 느림
-   SEO 문제 발생 가능성

### 코드 예시

```html
<!doctype html>
<html lang="en">
    <head>
        <title>CSR Example</title>
    </head>
    <body>
        <div id="app"></div>
        <script>
            document.getElementById('app').innerHTML = '<h1>Hello, Client Side Rendering!</h1>';
        </script>
    </body>
</html>
```

## 3. 멀티 페이지 애플리케이션 (MPA)

멀티 페이지 애플리케이션은 전통적인 웹 애플리케이션 구성 방식으로, 각 페이지가 별도의 HTML 파일로 존재하는 구조입니다. 웹 페이지를 불러올 때마다 새로운 페이지를 서버에 요청합니다.

### 장점

-   검색 엔진 최적화에 좋음
-   서버에서 HTML을 제공하므로 SSR과 유사한 이점이 있음

### 단점

-   사용자 인터랙션에서 페이지 전환 시 전체 페이지를 다시 로딩해야 함
-   프로젝트 구조가 복잡해질 수 있음

### 코드 예시

```html
<!-- about.html -->
<!doctype html>
<html>
    <head>
        <title>About - MPA Example</title>
    </head>
    <body>
        <h1>About Us Page</h1>
        <a href="/contact">Go to Contact Page</a>
    </body>
</html>
```

```html
<!-- contact.html -->
<!doctype html>
<html>
    <head>
        <title>Contact - MPA Example</title>
    </head>
    <body>
        <h1>Contact Us Page</h1>
        <a href="/about">Go to About Page</a>
    </body>
</html>
```

## 4. 싱글 페이지 애플리케이션 (SPA)

싱글 페이지 애플리케이션은 웹 애플리케이션의 모든 컨텐츠가 하나의 HTML 페이지에 존재하며 필요한 부분만 동적으로 변경되어 사용자에게 보여주는 구조입니다. JavaScript를 사용하여 클라이언트에서 동적으로 웹 페이지를 렌더링합니다.

### 장점

-   사용자 경험이 매우 부드러움(페이지 전환 없음)
-   서버 요청이 줄어듦

### 단점

-   초기 로딩에 필요한 자원 크기가 커지므로 로딩이 느릴 수 있음
-   SEO 문제 발생 가능성

### 코드 예시

```html
<!doctype html>
<html>
    <head>
        <title>SPA Example</title>
    </head>
    <body>
        <div id="app"></div>
        <script>
            // Define routes
            const routes = {
                '/': '<h1>Home Page</h1>',
                '/about': '<h1>About Page</h1>',
                '/contact': '<h1>Contact Page</h1>',
            };

            // Render function
            function render(route) {
                document.getElementById('app').innerHTML = routes[route];
            }

            // Event listener
            window.addEventListener('hashchange', () => {
                render(window.location.hash.substr(1));
            });

            // Initial render
            render('/');
        </script>
    </body>
</html>
```

## 결론

웹 애플리케이션 구축과 렌더링 방식은 애플리케이션의 성능, 사용자 경험 및 SEO 측면에서 큰 영향을 줄 수 있으므로, 상황에 맞는 적절한 기술을 선택하는 것이 중요합니다. SSR, CSR, MPA 및 SPA를 종합적으로 이해하고 각 방식의 장단점을 고려하여 웹 애플리케이션을 구성할 때 코드 예시와 이미지를 참고하시면 이해하기 더 쉬울 것입니다.
