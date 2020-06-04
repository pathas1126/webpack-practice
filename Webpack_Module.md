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

module.exports = { PI, getCircleArea };

// 또는 아래와 같이 내보낼 수도 있음
module.exports.PI = PI;
exports.getCircleArea = getCircleArea;
```

*※ 모듈을 내보낼 때는 하나의 방식으로 통일해서 내보내야 중간에 모듈이 상실되거나 혼동되는 것을 방지할 수 있음*

#### index.js

```javascript
const { getCircleArea } = require("./mathUtil");

const result = getCircleArea(2);
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
- 모듈로 분리했기 때문에 같은 함수를 다른 케이스에 사용하는 등 재사용성이 높아짐
- 코드의 양이 줄어 전보다 깔끔해졌고 함수가 기능별로 눈에 들어오기 때문에 가독성이 높아짐

# Webpack

> 오픈 소스 자바스크립트 모듈 번들러, 주로 자바스크립트를 위한 모듈 번들러이지만 호환 플러그인(로더)을 포함하는 경우 HTML, CSS, 심지어는 이미지와 같은 프론트엔드 자산들까지 변환 가능

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
- es) src/index.js

#### Output

> 웹팩이 생성하는 번들 파일에 대한 정보를 설정

- 번들 파일이 생성되는 위치나 이름과 같은 내용들을 설정하게 됨
- 파일이 생성되는 경로이기 때문에 파일 경로를 절대 경로로 작성해야 함
- ex) c://users/..../dist/bundle.js

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
- mode 값이 production인 경우 소스 코드가 압축된 상태로 번들링됨

```javascript
module.exports = {
  mode: "production",
};
```

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

> 번들러를 위한 html 파일을 자동으로 생성해주는 외부 플러그인

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

- HtmlWebpackPlugin 인스턴스에 옵션으로 전달한 데이터는 위와 같이 options 객체의 속성으로 접근 가능,
  title 뿐만 아니라 options.meta.charset 과 같이 options 객체의 모든 속성에 접근 할 수 있음
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
- script 태그가 자동으로 추가됨

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

- 파일이 변경되고 다시 빌드 될때만 해쉬값을 변경
- 수정사항이 없는 경우에는 브라우저의 캐시를 이용하게 됨

### hash 값 종류

- hash: 빌드가 진행될 때마다 새롭게 부여되는 해쉬값
- contenthash: 컨텐츠의 종류별로 해쉬값을 부여하게 됨
- chunkhash: 번들 파일의 크기가 너무 커지면 로드하는 데 걸리는 시간이 늘어나기 때문에 번들 파일을 몇 가지 기준으로 나눈 파일을 chunk 파일이라고 하며, 해당 파일명에 해쉬값을 부여하는 것을 chunkhash 라고 함

#### hash 사용 방법

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

### contenthash & mini-css-extract-plugin

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

### chunkhash

> 번들 파일을 런타임 청크 파일과 벤더 청크 파일로 분리

- runtime: 번들 파일에 포함된 모듈들을 순서대로 읽을 수 있도록 하는 초기화에 해당하는 코드,
  모듈에 변화가 발생하더라도 런타임 코드는 변하지 않기 때문에 청크 파일로 분리하면 캐시를 이용할 수 있게 됨
- vender: jQuery와 같이 외부 패키지에 해당하는 모듈들을 벤더라고 하며,
  버전 업을 하지 않는 이상 코드가 바뀌지 않기 때문에 청크 파일로 분리하면 캐시를 이용할 수 있게 됨

*※ runtime: 더 넓은 의미에서 런타임은 애플리케이션이 메모리를 할당받고 실행되는 환경을 뜻함*

#### runtime chunk 분리하기

```javascript
// ...
module.exports = {
  entry: "./index.js",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  // ...
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    // ...
};
```

- [name] : entry 파일 이름이나 웹팩 설정 파일 내에서 name 프로퍼티에 할당한 값이 적용됨
- [chunkhash] : chunk 파일의 해쉬 값을 지정
- optimization: 웹팩 번들 파일의 최적화를 담당하는 키,
  청크 파일을 분리하는 것 역시 최적화에 해당되기 때문에 optimization 키에서 관리
- runtimeChunk: 런타임 청크 파일에 대한 설정 키
- name: 런타임 청크 파일의 이름을 지정
- 프로젝트를 빌드해 보면 runtime.63236236...js 와 같은 런타임 청크 파일이 생성된 것을 볼 수 있음

#### vender chunk 분리하기

##### index.js

> jQeury를 분리하기 위해 패키지 설치 후 index.js 파일의 코드를 아래와 같이 수정

```javascript
import "normalize.css";
import styles from "./index.css";
import $ from "jquery";

const component = () => {
  const element = document.createElement("div");
  element.innerHTML = "Holy Moly!!!!";

  element.classList = styles.helloWebpack;

  return element;
};
window.onload = () => {
  document.body.appendChild(component());
  console.log($(`.${styles.helloWebpack}`).length);
};

```

- jQuery를 사용해서 styles.helloWebpack 클래스명을 사용하는 DOM 객체 수를 콘솔에 출력하는 코드를 추가

##### webpack.config.js

>vender 청크 파일을 분리하기 위해 웹팩 설정 파일을 아래와 같이 수정

```javascript
// ...
module.exports = {
  entry: "./index.js",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  // ...
  optimization: {
    // ...
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "venders",
          chunks: "all",
        },
      },
    },
  },
  // ...
};
```

- splitChunks: 청크 파일에 대한 설정을 하는 최상위 키,
- cacheGroups: test, priority, reuseExistingChunk 속성을 제외한 splitChunks의 모든 속성을 상속하거나 오버라이딩할 수 있으며, 여러 캐시 그룹에서 공통으로 사용할 속성에 대한 설정
- test: node_modules 내부에 해당되는 모듈들을 벤더 청크 파일로 분리하기 위해 설정
- name: 청크 파일의 이름을 venders로 지정
- chunks: 최적화를 위해 어떤 청크 파일이 선택될 지를 결정하는 속성이며, 'all' 키워드를 입력하면 청크 파일이 동기 청크 파일과 비동기 청크 파일 사이에서도 공유될 수 있도록 함

## Minification & Mangling

> 소스 코드 및 리소스 최적화와 관련된 개념

### Minification

> 최소화라는 말 그대로 소스 코드의 형태를 압축시키는 것

- 애플리케이션 동작 과정에 관여하지 않는 요소 제거
  ex) 주석, console.log, etc.
- 들여쓰기, 띄어쓰기 등을 최소화하고 분기문을 삼항연산자와 같은 짧은 코드로 변환시키는 과정 등이 포함됨

### Mangling

> Uglify 라고도 하며 표현의 난독화 과정

- 변수, 함수 등의 이름을 짧은 알파벳 한두 글자로 치환
- 외부에서의 코드 분석을 어렵게 함

### html-webpack-plugin 최적화

> webpack.config.js에서 HtmlWebpackPlugin 인스턴스 인수의 속성으로 minify 입력

```javascript
// ...
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack",
      template: "./template.hbs",
      meta: {
        charset: "UTF-8",
        viewport: "width=device-width, initial-scale=1.0",
      },
      minify: {
        collapseWhitespace: true,
        useShortDoctype: true,
        removeScriptTypeAttributes: true,
      },
    }),
    // ...
  ],
 // ...
};
```

- minify의 값으로는 논리값이나 객체가 들어갈 수 있으며, true인 경우에는 mode의 값이 production일 때와 동일한 옵션이 적용되고, 객체인 경우에는 직접 옵션을 설정할 수 있음
- collapseWhitespace: 공백을 제거하는 속성
- useShortDoctype: Doctype을 줄여주는 속성
- removeScriptTypeAttributes: script 태그의 type 속성을 제거해 주는 속성

### optimize-css-assets-webpack-plugin을 이용한 css 최적화

> optimize-css-assets-webpack-plugin은 css 컴프레서가 웹팩 구동 시 작동하도록 해주는 플러그인

#### 설치

```bash
$ npm i optimize-css-assets-webpack-plugin cssnano -D
```

- cssnano: css의 컴프레서로 사용할 CSS-NANO 역시 설치해야 함

#### webpack.config.js에 등록

```javascript
// ...
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
   // ...
   plugins: [
    // ...
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  // ...
  ],
  // ...
};
```

- optimize-css-assets-webpack-plugin에서 생성자 함수를 가져온 뒤 인스턴스를 plugins에 등록
- assetNameRegExp: 정규표현식을 사용해서 어떤 파일들에 대해 압축을 진행할 것인지 설정
- cssProcessor: css 처리기를 등록하는 속성으로 여기서는 CSS-NANO를 등록
- cssProcessorPluginOptions: 플러그인 옵션은 cssProcessor로 전달되며 기본값은 {}빈 객체
- canPrint: 플러그인이 콘솔에 메세지를 출력할 수 있는지를 나타내는 속성으로 기본값은 true
- 번들링 후 결과를 확인해 보면 html, js 파일처럼 css 파일도 압축되어 있는 것을 볼 수 있음

### terser를 이용한 JavaScript 최적화

> 자바스크립트 역시 압축에 컴프레서가 필요하며 대표적인 컴프레서들로는 ulifyjs, babel-minify, terser가 있으며,
> 웹팩은 기본적으로 terser를 이용함

#### 설치

```bash
$ npm i terser-webpack-plugin -D
```

- terser는 웹팩을 설치할 때  함께 설치되기 때문에 terser를 따로 설치할 필요는 없음
- 플러그인 자체는 외부 모듈이기 때문에 설치가 필요함

#### webpack.config.js에 등록

```javascript
// ...
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = {
  // ...
  optimization: {
    // ...
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        cache: true,
      }),
    ],
  },
  mode: "none",
};
```

- terser-webpack-plugin은 plugins 키에 등록하지 않고 optimization 내부 키인 minimizer에 등록
- 웹팩이 terser를 기본적으로 사용하는데 굳이 등록을 하는 이유는 옵션을 커스터마이징하기 위함
- minimize: 이 옵션을 true로 설정하면 terser의 기본적인 기능을 수행함
- minimizer: 자바스크립트 컴프레서 플러그인을 등록할 수 있으며 생성자 함수의 인수에 옵션 입력 가능
- cache: 변동이 없는 파일들에 대해서는 캐시를 이용하도록 해서 빌드 시간을 단축시켜주는 속성

## Webpack-Merge를 활용한 Mode 분리

> Development mode vs Production mode
> 코드 압축 및 난독화에 대한 설정이 늘어다가 보면 빌드 시간이 길어져서 개발 효율이 떨어질 수 있기 때문에,
> 개발 환경과 프로덕션 환경을 구분해서 환경에 맞는 스크립트를 사용할 수 있게 하는 것이 필요

### 설치 

```bash
$ npm i webpack-merge -D
```

### 공통 설정 분리

> 개발 모드와 프로덕션 모드에서 공통으로 사용되는 코드를 webpack.common.js 파일로 분리

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
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
      minify: {
        collapseWhitespace: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),

    new CleanWebpackPlugin(),
  ],
};
```

- optimization, optimize-css-assets-webpack-plugin 과 같이 프로덕션 모드에서만 사용되는 코드를 제거
- mode 역시 각각의 모드에서 설정할 것이기 때문에 제거

### 개발 환경 설정하기

> webpack.dev.js 파일에 개발 모드에서 사용할 코드를 webpack-merge를 이용해서 작성

```javascript
const merge = require("webpack-merge");
const common = require("./webpack.common"); // 공통 설정 가져오기

const config = {
  mode: "development",
};

module.exports = merge(common, config); // 공통 설정과 개발 설정 통합
```

- 개발 모드는 생산성을 향상시키는 여러가지 옵션들로 구성되어 있음
- 개발 모드는 설정만 해 두고 프로덕션 모드의 설정을 마친 뒤에 추가로 코딩을 진행할 예정

### 프로덕션 환경 설정하기

> 위에서 했던 것과 동일한 방식으로 webpack.prod.js 파일에 프로덕션 모드에서 사용할 코드 작성

```javascript
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const config = {
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),
  ],
  optimization: {
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "venders",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        cache: true,
      }),
    ],
  },
  mode: "production",
};

module.exports = merge(common, config);
```

- 기존의 webpack.config.js 파일에서 webpack.common.js 와 중복되는 코드를 제거
- 마찬가지로 webpack-merge 를 이용해서 공통 설정과 프로덕션 설정을 병합

### 스크립트 수정하기

> 각 환경에서 웹팩의 동작을 다르게 하기 위해서 package.json의 scripts 수정

```javascript
{
  // ...
  "scripts": {
    "dev": "webpack --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
  // ...
}
```

- webpack 명령어에 --config 옵션을 추가하면 웹팩이 실행될 때 사용할 설정 파일 지정 가능
- 각각의 명령어를 실행해 보면 빌드 결과가 다르게 나타나는 것을 확인할 수 있음
- 개발 환경에서의 빌드는 2.90초가 소요된 반면 프로덕션 환경에서는 6.67초가 소요됨

### define 플러그인 사용하기

> define:웹팩이 빌드를 진행할 때 특정한 상속값을 만들어서 프로젝트 어디서든 상속값을 사용할 수 있게 해주는 플러그인이며, 웹팩 내장 플러그인이기 때문에 별도의 설치는 필요 없음

#### webpack.common.js에 등록

```javascript
const webpack = require("webpack");

const isProduction = process.env.isProduction === "PRODUCTION";

module.exports = {
   // ...
   plugins: [
    // ...
    new HtmlWebpackPlugin({
      title: "Webpack",
      template: "./template.hbs",
      meta: {
        charset: "UTF-8",
        viewport: "width=device-width, initial-scale=1.0",
      },
      minify: isProduction
        ? {
            collapseWhitespace: true,
            useShortDoctype: true,
          }
        : false,
    }),
    new webpack.DefinePlugin({
      IS_PRODUCTION: isProduction,
    }),
  ],
};
```

- IS_PRODUCTION 이라는 전역 변수에 isProduction 값 할당
- isProduction은 node 환경의 process.env 객체의 isProduction 속성값을 "PRODUCTION"과 비교해서 논리값을 저장하는 변수
- isProduction 변수와 삼항 연산자를 이용해서 참일 때는 HtmlWebpackPlugin의 최적화 속성인 minify의 값으로 설정 객체를 할당하고, 거짓일 때는 최적화를 하지 않도록 false 값 할당

#### process.env.isProduction 속성 추가

> package.json 파일의 scripts를 수정해서 명령어에 따라 process.env.isProduction 값이 빌드 모드와 같게 설정

```json
{
  // ...
  "scripts": {
    "dev": "env isProduction=DEVELOPMENT webpack --config webpack.dev.js",
    "build": "env isProduction=PRODUCTION webpack --config webpack.prod.js"
  },
  // ...
}
```

- env 키워드를 사용하면 process.env 객체에 속성과 값을 등록 가능

#### index.js 에서 출력하기

```javascript
// ...
window.onload = () => {
  // ...
  console.log(`IS PRODUCTION: ${IS_PRODUCTION}`);
};
```

- define 모듈 덕분에 어디서든 IS_PRODUCTION 변수에 접근할 수 있게 되었기 때문에 index.js 파일에서 해당 변수를 사용해서 프로덕션 모드인지 아닌지를 콘솔창에 출력
- 각각의 스크립트를 실행해보면 개발 모드일 때는 false, 프로덕션 모드일 때는 true가 브라우저의 콘솔창에 출력되는 것을 볼 수 있음

### webpack-dev-server 사용하기

> webpack에서 로컬 서버의 지원을 위해 제공하는 모듈로 개발 환경에서 유용하게 사용

#### 특징

- 빌드 결과물을 사용하는 것이 아니라 메모리상에서 실행되기 때문에 dist 폴더와 상관없이 실행됨
- 메모리상에 실행되기 때문에 직접 파일을 빌드해서 실행하는 것보다 빠름
- 수정 역시 메모리상에서 비교한 뒤에 바로 반영되기 때문에 편리하게 사용할 수 있음
- 로컬 서버 포트의 기본값은 8080
- http 프로토콜로 실행되기 때문에 실제 웹 서비스의 실행 환경을 고려할 수 있게 됨
- 파일의 변화를 감지해서 바로 빌드를 진행하는 watch 옵션이 적용되어 있으며 live-reloading 환경을 제공

#### 설치

```bash
$ npm i webpack-dev-server -D
```

#### CLI로 실행해 보기

> node_modules의 .bin 폴더에 접근해서 직접 실행 가능

```bash
$ ./node_modules/.bin/webpack-dev-server --config webpack.dev.js
```

- 직접 실행할 때는 웹팩 설정 파일을 지정해 주어야 함

#### 스크립트에 등록하기

> 매번 경로까지 포함해서 명령어를 입력할 수는 없기 때문에 package.json의 scripts에 실행 명령어 등록

```json
{
  // ...
  "scripts": {
    "start": "env isProduction=DEVELOPMENT webpack-dev-server --config webpack.dev.js",
	// ...
  },
  // ...
}
```

- `yarn start` 또는 `npm run start` 명령어를 실행하면 8080포트로 로컬 서버가 구동됨

#### 옵션 - historyApiFallback

```javascript
const merge = require("webpack-merge");
const common = require("./webpack.common");

const config = {
  mode: "development",
  devServer: {
    historyApiFallback: {
      rewrites: [
        {
          from: /^\/subpage$/,
          to: "subpage.html",
        },
        {
          from: /./, // '.': 특정 경로를 제외한 모든 경로를 의미
          to: "404.html",
        },
      ],
    },
  },
};

module.exports = merge(common, config);
```

- webpack-dev-server와 관련된 설정은 devServer 키 내부에 정의
- historyApiFallback: 특정 url에 대해 어떤 페이지로 이동시킬 것인지에 대해 정의할 수 있는 속성이며, true 값을 입력하면 라우팅 처리가 되지 않은 경로로 접근했을 때 index.html 파일을 전송
- rewrites: 각각의 url에 대해 from, to 키워드를 사용해서 특정 경로에 대해 전송할 파일을 지정할 수 있음
- from의 값은 정규 표현식으로 작성하며, to에는 해당 경로에 전송할 파일 이름 입력
- webpack의 설정 파일을 수정하면 서버를 내렸다가 다시 구동시켜야 변경 사항이 반영됨

*※ to 속성 값으로 지정한 파일을 만들어 두어야 제대로 실행됨*

#### 옵션 - open

```javascript
const merge = require("webpack-merge");
const common = require("./webpack.common");

const config = {
  mode: "development",
  devServer: {
    open: true,
    // ...
  },
};

module.exports = merge(common, config);
```

- open 속성의 값을 true로 지정하면 webpack-dev-server 구동 시 기본 브라우저로 설정해 둔 브라우저의 새 탭이 열리게 됨
- 웹팩 서버를 내렸다가 다시 `yarn start` 명령어를 실행해 보면 브라우저가 열리는 것을 확인할 수 있음

#### 옵션 - overlay

```javascript
const merge = require("webpack-merge");
const common = require("./webpack.common");

const config = {
  mode: "development",
  devServer: {
    open: true,
    overlay: true,
    // ...
  },
};

module.exports = merge(common, config);
```

- overlay 속성을 true로 설정하면 에러 발생 시 에러 정보가 콘솔 창에 뜨는 것이 아니라 브라우저에 나타나게 됨
- CRA(create-react-app)에도 같은 설정이 적용되어 있기 때문에 CRA 환경에서 오류가 발생하면 브라우저에 에러 내용이 출력되는 것

#### 옵션 - port

```javascript
const merge = require("webpack-merge");
const common = require("./webpack.common");

const config = {
  mode: "development",
  devServer: {
    // ...
    port: 3000,
  },
};

module.exports = merge(common, config);
```

- port 속성의 값으로는 웹팩 개발 서버가 구동되는 포트를 임의로 지정할 수 있음
- 서버를 재시작해보면 3000번 포트로 로컬 서버가 구동되는 것을 확인할 수 있음
- 포트 번호는 다른 프로그램과 겹치지 않도록 설정하는 것이 권장됨

## Fileloader

> FileLoader: 모듈 내에서 import, require 키워드를 통해 사용하고자 하는 파일들을 모듈로 읽어들이는 로더,
> 빌드 시 output 폴더로 해당 모듈(파일)을 복사하는 역할을 함

### 설치

```bash
$ npm i file-loader -D
```

### webpack.common.js에 등록

> file-loader는 dev, prod 환경에서 모두 사용하므로 webpack.common.js 파일에 등록

```javascript
// ...
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[contenthash].[ext]",
            },
          },
        ],
      },
    ],
  },
  // ...
};
```

- test: 정규 표현식을 통해 처리할 이미지 파일의 확장자 지정
- name: 이미지 파일의 이름에 해시값을 지정하고 확장자를 원래 파일에서 받아서 사용하기 위해 ext 키워드 입력

### 이미지 파일 사용하기

> index.js 에서 이미지 파일 사용

```javascript
// ...
import slackImg from "./images/slack.jpg";

const component = () => {
  const element = document.createElement("div");
  element.innerHTML = "Holy Moly!!";

  const imgElement = document.createElement("img");
  imgElement.src = slackImg;
  console.log(slackImg);

  element.classList = styles.helloWebpack;
  element.appendChild(imgElement);

  return element;
};
// ...
```

- img 태그를 생성해서 src 속성의 값으로 이미지 모듈 사용
- 프로젝트를 실행해 보면 콘솔을 확인해 보면 해쉬값이 적용된 파일명이 출력되는 것을 볼 수 있음
- 빌드를 해보면 dist 폴더에 다른 파일들과 같이 이미지 파일도 들어가 있음

### 이미지 파일 관리하기

> 다른 파일과 마찬가지로 이미지 파일도 하나의 폴더에 관리하는 것이 좋으므로 프로젝트 구조를 수정하고 webpack.common.js의 entry 속성을 수정

```javascript
/*
폴더 구조
|-- 404.html
|-- dist
|-- package-lock.json
|-- package.json
|-- src
|   |-- images
|   |   |-- sample.svg
|   |   |-- slack.jpg
|   |   `-- slack.png
|   |-- index.css
|   `-- index.js
|-- subpage.html
|-- template.hbs
|-- webpack.common.js
|-- webpack.config.js
|-- webpack.dev.js
`-- webpack.prod.js
*/

// ...
module.exports = {
  entry: "./src/index.js",
  // ...
};
```

- index.js 파일을 src 폴더로 옮겼기 때문에 entry 속성의 값을 그에 맞게 수정

#### 빌드된 이미지 파일 관리하기

> 빌드된 이미지 파일 역시 dist 폴더 안에 assets 폴더에서 관리하기 위해 webpack.common.js 파일을 아래와 같이 수정

```javascript
// ...
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      // ...
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[contenthash].[ext]",
              publicPath: "assets/",
              outputPath: "assets/",
            },
          },
        ],
      },
    ],
  },
  // ...
};
```

- publicPath: 여러 모듈이나 output 속성에서 광범위하게 사용되는 속성이며, 해당 모듈의 url 경로 앞에 publicPath 속성의 값이 추가됨
- outputPath: 빌드가 되고 나서 file-loader에 의해 처리된 파일들이 저장될 경로를 지정하는 속성이며,
  output 속성의 path 값을 기준으로 정해짐
- 웹팩 개발 서버 실행 후 개발자 도구로 검사를 해보면 이미지 파일의 경로에 'assets/'가 추가된 것을 알 수 있음
- 또한 빌드를 해보면 이미지 파일이 dist/assets 폴더에 저장되는 것을 확인할 수 있음

### filename 분기 처리

> 개발 모드에서는 원래 파일명이 적용되고, 프로덕션 모드에서는 해쉬값이 추가된 파일명이 사용되도록 처리
> webpack.common.js 파일을 아래와 같이 수정

```javascript
// ...
const isProduction = process.env.isProduction === "PRODUCTION";

module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name() {
                if (!isProduction) {
                  return "[path][name].[ext]";
                }
                return "[contenthash].[ext]";
              },
              publicPath: "assets/",
              outputPath: "assets/",
            },
          },
        ],
      },
    ],
  },
  // ...
};
```

- options 객체에 name을 메서드로 등록
- 앞서 정의했던 isProduction 변수를 이용해서 개발 모드일 때는 파일명이,
  프로덕션 모드 일 때는 해시값이 적용되도록 메서드를 작성
- 메서드를 사용하지 않고 삼항연산자를 사용해도 결과는 동일함
- 웹팩 개발 서버를 재시작해서 img 태그의 src 속성을 보면 파일 이름이 저장되어 있고,
  빌드를 한 뒤에 index.html을 보면 src 속성값이 해쉬로 되어 있는 것을 알 수 있음

## UrlLoader

> 작은 이미지와 같은 리소스들을 Data URIs라는 특정한 형태의문자열로 변환해 주는 역할을 함,
> 인라인 형태로 적용되는 리소스라고 표현되기도 함

### 특징

- 이미지 파일이 문자열로 변환돼 문서 내에 삽입되기 때문에 리소스 요청 수를 줄일 수 있음
- http 프로콜을 통한 리소스 요청을 줄임으로써 다른 파일들을 보다 빨리 전송할 수 있게 됨
- 하지만 Data URIs의 용량이 너무 커지는 경우에는 문서의 불러오는 속도에 영향을 줄 수 있기 때문에
  용량을 적절히 조절하는 것이 요구됨

### Data URIs

> 데이터 URI 체계는 외부 자원 인 것처럼 웹 페이지에 데이터를 인라인으로 포함시키는 방법을 제공하는 균일한 자원 식별자 체계이며 4가지 요소로 구성됨

```html
data:mediatype;base64,data
```

- data: 가장 앞에 있는 data로, Data URIs가 시작됨을 알리는 요소
- mediatype: 읽어들인 미디어 모듈의 타입 정보가 기록되는 요소
  ex) JPEG 이미지 파일의 경우 'image/jpeg'
- base64: 바이너리 값(이미지)을 텍스트 형태로 인코딩할 때 사용되는 요소
- data: base64를 통해서 인코딩된 결괏값이 전달되는 요소

### 설치

```bash
$ npm i url-loader -D
```

### webpack 설정 파일에 등록

> 개발 모드와 프로덕션 모드에서 모두 사용되므로 webpack.common.js 파일에 url-loader 등록

```javascript
// ...
module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192, // 8KB 정도
            },
          },
        ],
      },
    ],
  },
  // ...
};
```

- test: svg 파일에 대해서만 url-loader 를 적용하도록 설정
- limit: 바이트 단위의 숫자가 들어가며, 최대 파일 크기에 대한 제한을 설정
- 브라우저마다 Data URIs의 문자열 크기를 제한하는 곳도 있기 때문에 적당한 정도로 limit 속성의 값을 설정하는 것이 중요
- limit 값을 초과하는 파일의 경우 자동으로 file-loader가 처리하도록 설정되어 있으며,
  options의 fallback 속성에서 limit을 초과한 파일을 어떤 로더로 다룰 것인지를 지정할 수 있음

### svg 파일 사용하기

> index.js 파일에서 기존의 jpg 파일을 svg 파일로 교체

```javascript
// ...
import svgImg from "./images/sample.svg";

const component = () => {
  const element = document.createElement("div");
  element.innerHTML = "Holy Moly!!";

  const imgElement = document.createElement("img");
  imgElement.src = svgImg;
  console.log(svgImg); // data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiB.....

  element.classList = styles.helloWebpack;
  element.appendChild(imgElement);

  return element;
};
// ...
```

- svg 파일을 콘솔에 출력해 보면 Data URIs의 형식으로 로그가 찍히는 것을 확인할 수 있음
- 브라우저의 network 탭을 확인해 보면 다른 파일들은 모두 http 프로토콜로 시작되는데,
  변환된 svg 파일만 다른 형태로 전송되는 것을 볼 수 있음





