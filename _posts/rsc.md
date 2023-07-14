---
title: '리액트 18 - 소개와 모범사례: 리액트 서버 컴포넌트'
excerpt: '리액트 18의 새로운 특징 중 하나인 리액트 서버 컴포넌트를 소개하고, 어떻게 사용하는지 알아보는 블로그 글입니다. 서버 컴포넌트의 장점과 함께 간단한 프로젝트 구성 예시를 확인해보세요.'
coverImage: 'https://addyosmani.com/assets/images/react-server-components@2x.png'
date: '2023-07-01T08:15:00.000Z'
author:
    name: 08베이식
    picture: '/public/beisik.png'
ogImage:
    url: 'https://addyosmani.com/assets/images/react-server-components@2x.png'
---

# 리액트 18 - 소개와 모범사례: 리액트 서버 컴포넌트

리액트에 이어 가장 크게 화제가 되고 있는 기술, 바로 리액트 18이 도입된 리액트 서버 컴포넌트에 대해 알아보겠습니다.

## 서론: 리액트 서버 컴포넌트란?

리액트 서버 컴포넌트는 브라우저에서 리액트를 렌더링하는 기존 방식(클라이언트 사이드)과 달리 서버에서 직접 렌더링하고 이를 웹 브라우저에 전달하는 새로운 렌더링 방식입니다. 이렇게 하면 사용자 경험이 향상되며 서버의 효율성이 높아집니다. 또한, 리액트를 사용하는 개발자들에게도 여러 이점이 있습니다.

## 리액트 서버 컴포넌트의 장점

리액트 서버 컴포넌트를 사용할 경우 다음과 같은 이점이 있습니다:

### 1. 클라이언트 사이드 로딩 속도 개선

리액트 서버 컴포넌트를 사용하면 `초기 렌더링 속도`가 빨라지고 사용자 경험이 개선됩니다. 이는 서버에서 처리된 컴포넌트를 사용자에게 전해주기 때문에 가능합니다.

### 2. 코드 스플리팅과 최적화

코드 스플리팅 및 최적화 기술을 활용하여 불 필요한 코드들을 클라이언트 측으로 전달하지 않고 서버측에서 관리함으로써 최종 파일 크기를 줄일 수 있습니다.

## 모범사례: 리액트 서버 컴포넌트 적용

이제 리액트 서버 컴포넌트를 적용하는 방법에 대해 알아보겠습니다. 모든 과정은 간단한 프로젝트 구조로 진행됩니다.

### 1. dependencies 설정

먼저 프로젝트의 `package.json` 파일에서 dependencies를 설정합니다.

```javascript
"dependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "react-server-dom-webpack": "^18.0.0"
}
```

### 2. 클라이언트 사이드 파일 구성

클라이언트 사이드의 파일들을 설계하고 구성합니다. 이때, 파일들은 아래와 같이 구성됩니다.

```
- client/
  - App.js
  - index.js
```

`index.js`에는 다음과 같은 코드를 작성합니다.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.hydrate(<App />, document.getElementById('root'));
```

`App.js`에는 클라이언트 사이드 렌더링 컴포넌트와 서버 컴포넌트를 포함합니다.

```javascript
import React from 'react';
import MyClientComponent from './components/ClientComponent';
import MyServerComponent from 'server-components/ServerComponent.server.js';

function App() {
    return (
        <div>
            <MyClientComponent />
            <MyServerComponent />
        </div>
    );
}

export default App;
```

### 3. 서버 사이드 파일 구성

서버 사이드의 파일들을 모아놓을 디렉토리를 설계하고 구성해줍니다.

```
- server-components/
  - ServerComponent.server.js
```

`.server.js` 로 된 파일은 서버 컴포넌트입니다. 이 파일은 서버사이드에서 렌더링되어 사용됩니다.

## 결론

위와 같이 리액트 서버 컴포넌트를 활용하면 클라이언트 사이드의 렌더링 부담을 줄이고 서버의 효율성을 높여 더 나은 사용자 경험을 제공할 수 있습니다. 또한, 개발자들에게도 코드 최적화와 관리성을 높이는 이점을 제공합니다. 이번 기회에 리액트 서버 컴포넌트를 활용해보세요!
