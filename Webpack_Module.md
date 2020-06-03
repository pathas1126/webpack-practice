# Module 이해하기

> Module: 프로그램을 구성하는 내부의 코드가 기능별로 나뉘어져 있는 형태

## 모듈을 왜 사용하는가?

- 코드의 재사용성이 증가
- 코드의 관리가 편해짐
- 코드를 구조적으로 빠르게 파악할 수 있음

*※ 코드를 모듈화할 때는 기준이 명확해야 효과를 볼 수 있음*

## 모듈 구성 요소

- Module System: 모듈을 인식하는 데에 필요
- Keyword: 모듈을 다루는 키워드가 제공되어야 함

## 모듈 표준

- CommonJS: 자바스크립트 실행 환경인 Node.js에서 채택한 묘둘 표준
- ESM(ECMAScript 2015 ~ ): ECMAScript에서 정의한 모듈 표준안

## 모듈 종류

1. Built-in Core Module: 내장 모듈로 Node.js 와 같은 실행 환경이 기본적으로 가지고 있는 모듈을 말함
   ex) path: 파일의 경로를 보다 편리하게 다룰 수 있도록 도와주는 모듈
2. Community-based Module: 커뮤니티를 기반으로 제공되는 모듈로 NPM을 사용해서 설치하는 모듈들이 여기에 해당됨
   ex) esm: Node.js 환경에서 ESM 모듈 표준을 사용할 수 있게 해주는 외부 모듈
3. Local Module: 특정 프로젝트에서 정의한 모듈로 로컬 환경에서 사용할 수 있는 모듈을 뜻함

## 모듈 다루기

### 모듈 내보내기

- 내보낼 것들을 객체에 담아서 한 번에 내보내기
- 내보낼 값들을 개별적으로 내보내기

### 모듈 가져오기

- 모듈도 하나의 객체로 취급되기 때문에 객체를 참조하거나 사용하는 방법을 그대로 사용

## CommonJS

### require(모듈 경로)

- require 키워드를 이용해서 참조하고자 하는 모듈을 가져옴

### module.exports

- commonjs에서 객체를 내보낼 때는 module이라는 객체를 사용
- commonjs 환경에서는 전역에서 module 객체에 접근 가능
- require 키워드가 module 객체의 exports 키워드를 참조

```javascript
// 내보낼 여러 개의 값을 객체 안에 넣어서 내보냄
module.exports = { ... };

// 하나의 값이나 함수를 바로 할당
module.exports = FUNCTION_OR_VALUE;

// module.exports에 키를 지정하고 거기에 값을 할당
module.exports.KEY = VALUE;

// 위 식의 축약형
exports.KEY = VALUE;
```

### 예제

> 원의 넓이를 구할 때 필요한 PI 상수와 공식 함수를 모듈로 분리한 뒤 사용

#### mathUtil.js

```javascript
const PI = 3.14;
const getCircleArea = (r) => r * r * PI;

module.exports = { PI, getCirclrArea };

// 또는 아래와 같이 내보낼 수도 있음
module.exports.PI = PI;
exports.getCircleArea = getCircleArea;
```

*※ 모듈을 내보낼 때는 하나의 방식으로 통일해서 내보내야 중간에 모듈이 상실되거나 혼동되는 것을 방지할 수 있음*

#### index.js

```javascript
const { getCircleArea } = require("./mathUtil");

const result = getCirclrArea(2);
console.log(result); // 12.56
```

- PI 값은 index.js 에서 직접 사용하지 않기 때문에 getCircleArea 함수만 가져와서 사용

## ESM

### import

- [import 모듈 이름 from 모듈 위치] 와 같은 방식으로 사용

### export

- export 키워드로 내보내거나 export default 키워드를 사용해서 내보낼 수 있음
- default 키워드는 하나의 파일에서 한 번만 사용 가능

### Node.js에서 ESM 사용하기

> Node.js는 CommonJS 모듈 표준을 따르기 때문에 ESM 모듈을 사용하기 위해서는 외부 모듈을 설치해야 함

#### ESM 모듈 설치

```bash
$ npm install esm
```

#### esm 모듈로 node.js 실행하기

```bash
$ node -r esm ~.js
```

- -r 옵션을 사용하면 Node.js를 commonJS 이외의 모듈 표준으로 실행 가능

### 예제

> 위에서 commonJS로 했던 예제를 ESM 모듈 키워드로 변환

#### mathUtil.js

```javascript
const PI = 3.14;
const getCircleArea = (r) => r * r * PI;

export { PI, getCircleArea };
```

#### index.js

```javascript
import { getCircleArea } from "./mathUtil";

const result = getCircleArea(2);
console.log(result); // 12.56
```

- `node -r esm index.js` 명령어로 코드를 실행해 보면 위의 예제와 같은 결과를 얻는 것을 볼 수 있음

#### default 키워드 사용하기

```javascript
// mathUtil.js
const PI = 3.14;
const getCircleArea = (r) => r * r * PI;

export default { PI, getCircleArea };

// index.js
import mathUtil from "./mathUtil";

const result = mathUtil.getCircleArea(2);
console.log(result); // 12.56
```

- default 키워드를 사용해서 모듈을 내보내는 경우, 객체에 이름을 지정하고 객체의 속성으로 접근해야 함
- export 키워드만 사용하는 경우 내보내는 모듈과 가져올 때의 이름이 같아야 하지만,
  default 키워드를 사용해서 기본으로 내보내는 경우 어떠한 이름으로도 가져올 수 있음

## 모듈 종합 예제

> readline이라는 Node.js 내장 모듈을 사용해서 정사각형과 원의 넓이를 구하는 프로그램 작성 후 모듈로 분리
> readline: 사용자로부터 입력을 받을 수 있게 여러 기능을 제공하는 모듈, Java의 Scanner와 유사

### readline.js

> 모듈로 기능을 분리하기 전의 코드

```javascript
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("원하는 도형을 작성해 주세요. 정사각형 or 원 ", (figure) => {
  console.log(`선택된 도형: ${figure}`);

  switch (figure) {
    case "정사각형":
      rl.question("변의 길이를 입력하세요", (input) => {
        console.log(`입력받은 값: ${input}`);
        console.log(`정사각형의 넓이는 ${input * input} 입니다.`);
        rl.close();
      });
      break;
    case "원":
      rl.question("반지름의 길이를 입력하세요", (input) => {
        console.log(`입력받은 값: ${input}`);
        console.log(`원의 넓이는 ${input * input * 3.14} 입니다.`);
        rl.close();
      });
      break;
    default:
      console.log(
        "지원하지 않는 도형입니다. '정사각형' 또는 '원'을 입력하세요. \n커맨드 라인을 종료합니다."
      );
      rl.close();
  }
});
```

### mathUtil.js

> 도형을 구하는 함수를 모듈로 분리

```javascript
const PI = 3.14;
const getCircleArea = (r) => r * r * PI;
const getSquareArea = (d) => d * d;

module.exports = { PI, getCircleArea, getSquareArea };
```

### log.js

> 로그를 출력하는 함수를 모듈로 분리

```javascript
const logInput = (input) => {
  console.log(`입력받은 값: ${input}`);
};

const logResult = (figure, result) => {
  console.log(`${figure}의 넓이는 ${result}`);
};

const logError = () =>
  console.log(
    "지원하지 않는 도형입니다. '정사각형' 또는 '원'을 입력하세요. \n커맨드 라인을 종료합니다."
  );

module.exports = { logInput, logResult, logError };
```

### 결과_readline.js

> 모듈로 분리한 기능을 가져와서 원래 readline.js 코드를 리팩터링

```javascript
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const { getCircleArea, getSquareArea } = require("./mathUtil");
const { logInput, logResult, logError } = require("./log");

rl.question("원하는 도형을 작성해 주세요. 정사각형 or 원 ", (figure) => {
  console.log(`선택된 도형: ${figure}`);

  switch (figure) {
    case "정사각형":
      rl.question("변의 길이를 입력하세요", (input) => {
        logInput(input);
        logResult(figure, getSquareArea(input));
        rl.close();
      });
      break;
    case "원":
      rl.question("반지름의 길이를 입력하세요", (input) => {
        logInput(input);
        logResult(figure, getCircleArea(input));
        rl.close();
      });
      break;
    default:
      logError();
      rl.close();
  }
});
```

- 기능별로 모듈을 분리했기 때문에 해당 파일의 코드에서 어떤 기능들이 사용되는지를 한눈에 알 수 있음
- 모듈로 분리했기 때문에 같은 함수를 사용해서 다른 케이스에 사용하는 등 재사용성이 높아짐
- 코드의 양이 줄어 전보다 깔끔해졌고 함수가 기능별로 눈에 들어오기 때문에 가독성이 높아짐

# Webpack

> 오픈 소스 자바스크립트 모듈 번들러, 주로 자바스크립트를 위한 모듈 번들러이지만 호환 플러그인을 포함하는 경우 HTML, CSS, 심지어는 이미지와 같은 프론트엔드 자산들까지 변환 가능

## Bundle 이란?

> 서로 참조 관계에 있는 모듈들을 모아 의존성을 안전하게 유지하면서 하나의 파일로 묶는 것을 '번들'이라고 함

## Bundle이 중요한 이유

1. 모든 모듈을 로드하기 위해 검색하는 시간이 단축됨
   한 파일에 모든 모듈이 담기기 때문에 다른 파일에 접근하는 횟수도 줄어들고, 다른 파일의 모듈을 참조하는 것보다 한 파일 내에서 모듈을 찾는 속도가 더 빠르기 때문에 처리 속도가 향상됨
2. 사용하지 않는 코드를 제거
   실제로 참조하는 모듈의 코드만 남기 때문에 불필요하게 파일의 용량이 커지는 것을 방지
3. 파일의 크기를 줄여줌
   여러 파일을 압축하는 것보다 번들링된 하나의 파일을 압축할 때 압축 파일의 용량이 더 작아짐

## Webpack 기본 구조

> 여러 가지 참조 관계에 있는 파일들을 확장자별로 하나의 파일로 묶어줌

![](C:\Users\patha\Desktop\필기\img\webpack.png)

### Webpack이 바라보는 모듈

1. js
2. sass
3. hbs: handlebars의 줄임말로 템플릿 엔진
4. jpg, png
5. ...

### Entry & Output

#### Entry

> 모듈의 의존 관계를 해석하기 위한 시작점을 설정

- 모듈 A가 모듈 B, C를 참조하고 있다고 할 때, Entry를 모듈 A로 설정해야 웹팩이 모듈 A를 시작점으로 모듈 B, C와의 의존성을 파악하고 그를 통해 의존성 그래프를 생성한 뒤 번들링을 진행할 수 있음

#### Output

> 웹팩이 생성하는 번들 파일에 대한 정보를 설정

- 번들 파일이 생성되는 위치나 이름과 같은 내용들을 설정하게 됨
- 파일이 생성되는 경로이기 때문에 파일 경로를 절대 경로로 작성해야 함

#### 예제

> 앞의 'Module' 파트에서 했던 예제를 웹팩을 사용해서 번들링해보는 예제

##### 설치

> webpack과 커맨드 라인에서 웹팩을 실행하기 위한 webpack-cli 설치

```bash
$ npm init -y
$ npm install webpack webpack-cli --save-dev
```

##### 0 configuration

> webpack 4에 추가된 기능으로, 웹팩에서 자주 사용되는 기본적인 설정들을 바로 사용할 수 있음

- 기본 entry는 src/index.js이며 기본 output은 dist/main.js로 지정되어 있기 때문에 해당 형식에 폴더 구조를 맞추어야 함
  *※ dist/main.js는 직접 생성하지 않아도 웹팩 실행 시 자동으로 생성*
- webpack을 실행할 때는 웹팩의 실행환경을 target 속성으로 지정해 주어야 함,
  타겟을 지정하지 않으면 브라우저를 의미하는 'web'이라는 값이 기본값으로 적용
  ex) Node.js에서 실행하는 경우 명령어는 `npx webpack --target=node`

##### 실행

```bash
$ npx webpack --target=node

# 폴더 구조는 아래와 같아짐
|-- dist
|   `-- main.js
|-- package.json
|-- src
|   |-- index.js
|   |-- log.js
|   `-- mathUtil.js
`-- yarn.lock
```

- `node dist/main` 명령어로 main.js 파일을 실행해 보면 정상적으로 동작하는 것을 알 수 있음

#### Webpack 설정하기

> 프로젝트 루트에 webpack.config.js 파일을 생성하고, 그 안에 번들링에 필요한 웹팩 설정을 작성

##### webpack.config.js

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  target: "node",
};
```

- path: Node.js 에서 제공하는 파일 경로를 편하게 다룰 수 있는 모듈
- entry: 시작 파일을 지정하는 속성
- output: 번들 결과물 파일에 대한 설정을 포함하는 속성
- path: output의 경로는 파일을 생성하는 것이기 때문에 절대 경로로 작성
- filename: 결과물 파일의 이름을 설정
- target: cli에서 실행할 때와 마찬가지로 웹팩 실행환경을 지정하는 속성
- `npx webpack`명령어를 실행해 보면 dist 폴더에 bundle.js 파일이 생성된 것을 확인할 수 있음

*※ __dirname: 현재 실행되는 파일의 절대 경로를 담고 있는 Node.js의 전역 변수*
*path.resolve: 왼쪽 인수부터 '/' 기호를 사용해서 파일 경로를 연결한 뒤 문자열로 반환하는 메서드*

### Mode

> 개발 모드와 실제 서비스되는 애플리케이션 모드를 구분하는 것

- package.json의 dependencies는 실제 애플리케이션을 구동하는 데에 필요한 모듈들에 대한 의존성을 나타내며, devDependencies는 애플리케이션을 개발하는 데에 필요한 모듈들에 대한 의존성을 나타냄
- npm으로 모듈을 설치할 때 `--save`옵션(default)은 dependencies에 모듈을 추가하고,
  `--save-dev`옵션은 devDependencies에 모듈을 추가

### Loader

> 웹팩이 의존성 그래프를 형성하는 과정에서 다양한 모듈들을 입력받아 처리하는 역할

- 웹팩이 기본적으로 모듈로 인식하는 파일은 js, json 파일이기 때문에 다른 파일의 경우 로더가 필요
- module: 로더를 등록하기 위해 시작하는 키
- rules: 지원해야 하는 모듈 타입을 위해 필요한 로더를 지정하는 키, 로더를 배열로 입력받으며, 로더가 기본 동작을 수행할 때는 문자열로 로더를 입력하고 세부 항목을 지정할 때는 객체로 입력

```javascript
module.exports = {
    module: {
        rules: [loader1, loader2]
    }
}
```

#### CSS Loder

- css-loader: css 파일을 모듈로 다루기 위해 사용되는 로더
- style-loader: 모듈로 가져온 css를 style 태그를 생성해서 head 태그 내부에 주입하는 로더

#### webpack.config.js 에서 설정하기

```javascript
const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "singletonStyleTag",
            },
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  target: "web",
  mode: "none",
};
```

- test: 정규표현식을 통해 어떤 파일에 로더를 적용할 것인지 지정
- use: 사용할 로더를 배열로 입력
- options: 각 로더마다 다양한 옵션이 있기 때문에 각 로더의 github 저장소에서  README 확인
- injectType: style-loader가 head 태그 안에 style 태그를 주입하는 방식을 지정,
  singletonStyleTag 로 지정하면 하나의 style 태그가 주입됨
- modules: css-loader가 각각의 css 파일을 모듈화함으로써 클래스명이 겹치지 않도록 해주는 속성

#### CSS 표준화 모듈

- reset css: 브라우저에서 기본적으로 적용하는 스타일을 제거함으로써 커스터마이징을 보다 자유롭게 할 수 있음
- normalize.css: 각 브라우저마다 스타일이 다른 부분만을 같은 스타일로 변경

*※ npm을 통해 공개되어 있다면 npm을 통해 설치 가능*

### Plugin

> 웹팩이 동작하는 과정에 개입하며 번들 파일에 변화를 주거나, 개발 편의성을 증진하는 등의 다양한 역할 수행

- plugins: 등록할 플러그인을 배열 타입으로 등록
- new 키워드를 이용해서 생성한 플러그인의 인스턴스를 배열에 전달
- 웹팩 패키지 내부에 있는 플러그인과 외부 저장소에 있는 플러그인으로 나뉨

```javascript
module.exports = {
    plugins: [ new Plugin({...option}), ... ]
}
```

#### html-webpack-plugin

> 번들러를 위한 html 파일을 자동으로 생성

- 웹팩 설정 파일의 output에 대한 정보들을 참조해서 자동으로 script, link 태그를 추가해 줌

#### webpack.config.js 에서 설정하기

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: "./template.html",
    }),
  ],
  // ...
};
```

- plugins 키에 플러그인의 인스턴스를 배열로 전달
- 생성자 함수의 인수로 옵션 입력
- template: 새롭게 생성될 html 파일의 기준이 될 html 파일을 지정

## handlebars 템플릿 엔진 사용해 보기

> 템플릿 엔진: model에 있는 데이터를 어디에 어떻게 표현할 지를 문서 내부에 지정할 수 있는 기술

### webpack.config.js 에서 설정하기

```javascript
// ...

module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.hbs$/i,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack",
      template: "./template.hbs",
      meta: {
        charset: "UTF-8",
        viewport: "width=device-width, initial-scale=1.0",
      },
    }),
  ],
  // ...
};
```

- title: title이라는 키에 'Webpack' 문자열 값 지정
- template: hbs 확장자 파일을 템플릿으로 설정
- meta: 새로 만들어질 html 파일의 meta 태그를 설정할 수 있음

### template.hbs

> 템플릿 파일인 handlebars 파일 생성

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <title>{{htmlWebpackPlugin.options.title}}</title>
</head>

<body></body>

</html>
```

- HtmlWebpackPlugin 인스턴스에 옵션으로 전달한 데이터는 위와 같이 options 객체의 속성으로 접근 가능
- handlebars는 동적으로 전달받는 데이터를 {{ }} 이중 중괄호 안에 입력
- meta 태그는 웹팩에서 설정했기 때문에 삭제

### 결과

> dist 폴더에 생성된 index.html 파일

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Webpack</title>
    <meta name="charset" content="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

- title 태그의 텍스트로 'Webpack'이 사용됨
- webpack.config.js 에서 설정한 meta태그가 추가됨
- script 파일이 자동으로 추가됨

## caching && webpack

### cache

> 컴퓨터 과학에서 데이터나 값을 미리 복사해 놓는 임시 장소를 말함

- 캐시를 사용하면 서버에 리소스를 요청하는 횟수를 줄일 수 있음
- 사용자도 클라이언트에 저장된 값을 사용하므로 보다 빠르게 데이터에 접근 할 수 있음
- Local Cache: 사용자가 웹 애플리케이션 서비스에 접속하는 환경에 있는 캐시이며,
  브라우저 로컬 캐시는 요청을 통해 받는 모든 종류의 리소스를 포함함
- 사용자가 '뒤로 가기', '앞으로 가기', '새로고침' 등의 동작을 할 때 캐시가 있다면 캐시를 사용하게 됨
- 브라우저는 url을 기준으로 캐시를 구분하며, 로드하는 리소스의 이름이 같은 경우 캐시를 이용함

### webpack을 이용한 caching

> 수정 후 번들링한 파일명이 기존의 번들 파일명과 같다면 브라우저는 캐시에 있는 리소스를 사용하게 되며 이 때문에 수정한 내역이 반영되지 않을 수 있는데, 이를 해결하기 위해 해쉬 값을 파일명에 추가해서 번들링할 때마다 새로운 이름을 가진 파일이 생성되도록 함

- 파일이 변경될 때만 해쉬값을 변경
- 수정사항이 없는 경우에는 브라우저의 캐시를 이용하게 됨

### hash 값 종류

- hash: 빌드가 될 때마다 부여되는 해쉬값
- contenthash: 컨텐츠의 종류별로 해쉬값을 부여하게 됨
- chunkhash: 

#### 사용 방법

> webpack.config.js파일에서 output 속성의 filename 키 값에 []대괄호 사용

```javascript
// ...
module.exports = {
  // ...
  output: {
    filename: "bundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  }
  // ...
};
```

- 빌드를 하면 해쉬값을 갖는 새로운 js 파일이 생성됨
- 하지만 빌드를 할 때마다 새로운 파일이 생성되기 때문에 불필요한 파일이 늘어나는 문제가 발생

### clean-webpack-plugin

> 빌드가 될 때마다 빌드 폴더를 비워주고 새로 생성된 파일들만 남도록 도와주는 플러그인

#### 플러그인 등록하기

> clean-webpack-plugin의 생성자 함수는 구조분해를 통해서 가져와야 함

```javascript
// ...
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // ...
  ,plugins: [
    // ...
    ,new CleanWebpackPlugin(),
  ],
  // ...
};
```

- 플러그인 등록 후 빌드를 해보면 기존에 있던 파일들이 모두 비워지고 빌드한 파일만 남는 것을 확인할 수 있음

### mini-css-extract-plugin

> css를 html 파일에 태그로 주입하지 않고 별도의 파일로 빌드하도록 도와주는 플러그인

#### 플러그인 등록하기

```javascript
// ...
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          //   {
          //     loader: "style-loader",
          //     options: {
          //       injectType: "singletonStyleTag",
          //     },
          //   },
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      // ...
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[contenthash].css',
    }),
    // ...
  ],
  // ...
};
```

- 기존에 있던 style-loader가 스타일 태그를 html 파일에 주입해주는 역할이었기 때문에 style-loader의 등록을 해제한 뒤에 mini-css-extract-plugin의 로더를 등록
- 마찬가지로 플러그인이기 때문에 plugins 배열에 인스턴스를 추가
- 생성자 함수의 인수로 옵션을 전달할 수 있는데 filename 속성에 해시값을 사용하도록 지정 가능
- 결과를 보면 css 파일이 별도로 분리됨
- css 파일이 캐시를 활용할 수 있게 되며 html에서 분리되었기 때문에 html 파일의 용량이 감소
- contenthash를 사용하면 css 파일이 수정되었을 때만 빌드 파일에 새로운 해시값을 부여할 수 있게 됨

*※ MiniCssExtractPlugin을 CleanWebpackPlugin 보다 앞에 두어야 정상적으로 결과가 실행됨*

