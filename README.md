# ⚓ ANCHOR

<p align="center">
  <img width=400 alt="anchor" src="https://github.com/user-attachments/assets/5ebc5c4c-49b8-4dc2-8187-aed9fb5c8bee" />
</p>

<p align="center">
  <b>"Welcome aboard!"</b>  <br>
  <br> <b>Anchor</b>는 3D 요소와의 상호작용을 강조한 포트폴리오 웹사이트입니다. 사용자는 보트를 직접 조작하여 광활한 바다를 탐험하게 됩니다. <br>섬에 도착하여 포트폴리오에 대한 소개를 접하고 상호작용에 따라 간단한 미니게임도 즐길 수 있습니다.
</p>

<br>

<p align="center">
  <a href="https://anchorportfolio.site/">website</a>
  <span> | </span>
  <a href="https://github.com/YujinKang1024/anchor">Repository</a>
</p>

<br>


# 📒 목차

- [⚓ ANCHOR](#-anchor)
- [📒 목차](#-목차)
- [🛟 주요 기능](#-주요-기능)
    - [보트의 조작](#보트의-조작)
    - [시스템 상태](#시스템-상태)
      - [1. 보트 조작 모드](#1-보트-조작-모드)
      - [2. 섬 진입 모드](#2-섬-진입-모드)
- [⛵ 프로젝트 기획](#-프로젝트-기획)
    - [💭 기획 동기](#-기획-동기)
    - [💭 기획 과정](#-기획-과정)
      - [1. 컨셉 결정](#1-컨셉-결정)
      - [2. 레이아웃 구성 및 콘티 작성](#2-레이아웃-구성-및-콘티-작성)
- [🛠️ 기술 스택](#️-기술-스택)
    - [⚙️ React \& React Three Fiber](#️-react--react-three-fiber)
    - [⚙️ Jotai (상태 관리)](#️-jotai-상태-관리)
    - [⚙️ Styled Components (스타일링)](#️-styled-components-스타일링)
    - [⚙️ GSAP (애니메이션)](#️-gsap-애니메이션)
- [🌊 구현 과정](#-구현-과정)
    - [💦 바다 구현하기](#-바다-구현하기)
      - [1. 구현 목표](#1-구현-목표)
      - [2. 셰이더를 활용한 물 표면 구현](#2-셰이더를-활용한-물-표면-구현)
      - [3. 반사 구현 과정의 도전 과제들](#3-반사-구현-과정의-도전-과제들)
      - [4. 파도와 물결 움직임 구현](#4-파도와-물결-움직임-구현)
      - [5. 물의 시각적 효과 구현](#5-물의-시각적-효과-구현)
    - [⛵ 보트의 이동](#-보트의-이동)
      - [1. 구현 목표](#1-구현-목표-1)
      - [2. 이동 시스템 구현](#2-이동-시스템-구현)
      - [3. 충돌 시스템 구현](#3-충돌-시스템-구현)
    - [🏝️ 섬에서의 상호작용](#️-섬에서의-상호작용)
      - [1. 자판기 캔 뽑기 이벤트](#1-자판기-캔-뽑기-이벤트)
- [🔧 향후 개선 사항](#-향후-개선-사항)
- [🗓️ 개발 일정](#️-개발-일정)
- [💻 개발 후기](#-개발-후기)

<br>


# 🛟 주요 기능

### 보트의 조작
키보드의 w,a,s,d키로 보트를 조작하고 섬에 도달할 수 있습니다.
  - `W`: 보트를 앞으로 이동
  - `A`: 보트를 왼쪽으로 회전
  - `S`: 보트를 뒤로 이동
  - `D`: 보트를 오른쪽으로 회전
    <details>
    <summary> 미리 보기 </summary>

    <br>
    <div align="center">
      <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MTlfMTY4/MDAxNzI0MDUwNzAwODU4.No495pc6-tRIq8Q0VO4_vI5kJjwUNllkY-FOmrmqPXcg.wjdbDx-ID0FE9p090Slyy_1VBq75cEOfuPf1n7gcprwg.GIF/%EC%9D%B4%EB%8F%99.gif?type=w3840">
      <p>키보드 조작을 통한 보트의 이동</p>
    </div>
    </details>

### 시스템 상태
시스템은 크게 두 가지 모드로 나눌 수 있습니다.

#### 1. 보트 조작 모드
- 사용자가 보트를 조작할 수 있는 상태입니다.
- About 버튼을 통해 개발자에 대한 소개를 접할 수 있습니다.
    <details>
    <summary> 미리 보기 </summary>

    <br>
    <div align="center">
      <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MTlfOTUg/MDAxNzI0MDUxMTIyODQy.diDGtuFvHb7Xv074w7EYsKy9TuN9hV5TGsPE0509u68g.E2rKq6r8kSl2GRgoWAV4zSAgoxGpSy6OQSNpAK_yF1gg.GIF/%EC%96%B4%EB%B0%94%EC%9B%83.gif?type=w3840">
      <p>About 버튼 상호작용</p>
    </div>
    </details>

#### 2. 섬 진입 모드
- 섬에 다가가면 등장하는 Enter Island 버튼을 통해 섬에 진입한 상태입니다.
    <details>
    <summary> 미리 보기 </summary>
    <div align="center">
      <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MTlfMTgw/MDAxNzI0MDUxOTk0NDQ1.fMkOw1hUTMjjkC1QmiQBu_5j1Vnl-Ff9IlzQK34Pt4gg.ooK8bLi-0dHbwcAfHZlW47SxJK6Z3gkiPdQ9m4VRnPQg.GIF/%EC%84%AC%EC%A7%84%EC%9E%85.gif?type=w3840">
      <p>Enter Island 버튼으로 섬에 진입</p>
    </div>
    </details>

<br>

- PORTFOLIO 버튼을 통해 개발자 포트폴리오에 대한 정보를 접할 수 있습니다.
    <details>
    <summary> 미리 보기 </summary>
    <div align="center">
      <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MjBfMjMy/MDAxNzI0MTQyNTY0Mzcw.iqw3Jz2zcHTZmWmSZg2UnnMpfCU6ty6ZMX5lkQ1E3YMg.isaAy_wUSC2lvI6L_VC39j-_IRp_fRdi3vZoUY1FfnYg.GIF/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4_(1).gif?type=w3840">
      <p>프로젝트 여명 포트폴리오 정보</p>
    </div>
    </details>

<br>

- 버튼 오브젝트를 클릭하면 몬스터와의 전투가 벌어집니다. 스페이스 바를 통해 몬스터를 공격할 수 있습니다.
    <details>
    <summary> 미리 보기 </summary>

    <br>
      <div align="center">
        <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MjBfNTcg/MDAxNzI0MTQzMTU0ODQw.BlAPLZS7hLS5AoPbcPEH-VafqwN2Gl7m9SSjIe--gPQg.RD3t13T1fG5x9qM5D1sh6M2WzyEqTCe0cVEvEUidbf8g.GIF/%EC%A0%84%ED%88%AC%ED%8C%A8%EB%B0%B0.gif?type=w3840">
        <p>전투 패배 시 섬에서 퇴장하게 됩니다.</p>
        <img width ="600" src="https://postfiles.pstatic.net/MjAyNDA4MjBfMzgg/MDAxNzI0MTQzMzgxMTA1.zFdXvYNKxSGlCm_DYnGIp2bXleq-WuAtGa0ORBh9zzAg.ysu89Sxml7xyBuhWblfOxAVA3btgWM1HA6jqVSpY18cg.GIF/%EC%A0%84%ED%88%AC%EC%8A%B9%EB%A6%AC.gif?type=w3840">
        <p>전투 승리 시 승리 UI가 출력됩니다.</p>
      </div>
    </details>

<br>

- 자판기 오브젝트를 클릭해 음료수를 뽑을 수 있습니다.
    <details>
    <summary> 미리 보기 </summary>

    <br>
    <div align="center">
      <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MjBfMjU4/MDAxNzI0MTQzNjcyODgz.znp81R-GkoxsHUbElutPbBikZCzPRKI4nq40OQ28P4cg.dBh86Uf99AUimION5dYJytIfA8WlWD2qeW7WPXZxL1Eg.GIF/%EC%9E%90%ED%8C%90%EA%B8%B0.gif?type=w3840">
      <p>음료수를 5번 이상 뽑으면 품절됩니다.</p>
    </div>
    </details>
<br>

# ⛵ 프로젝트 기획

### 💭 기획 동기

게임 개발, 특히 3D 배경 그래픽 분야에서 쌓아온 전공 경험을 바탕으로, 웹 개발이라는 새로운 도전에 나서게 되었습니다. 게임 콘텐츠 제작을 넘어 실용적인 웹 서비스 개발에 관심을 갖게 되었지만, 여전히 3D 그래픽에 대한 저의 열정은 변함이 없습니다.

저는 3차원 공간이 주는 생동감이 사용자의 몰입도를 높이는 강력한 도구라고 생각합니다. 단순한 평면적인 웹사이트를 넘어, 사용자의 기억에 오래 남을 수 있는 역동적인 3D 웹 경험을 설계하고 싶었습니다.

이번 프로젝트는 단순한 기술 스택 확장을 넘어, 개발자로서 제가 추구하는 정체성을 표현하는 기회이기도 합니다. 이러한 고민 끝에, 3D 요소를 활용하여 역동적인 포트폴리오 웹사이트를 제작하는 것을 목표로 삼았습니다.
### 💭 기획 과정
#### 1. 컨셉 결정
저를 가장 잘 표현할 수 있는 컨셉을 고민하던 중, 주변인들의 의견이 큰 도움이 되었습니다.
“끊임없이 변화하는 기술의 바다 속에서 꾸준히 성장해나가는 모습이 마치 항해하는 배와 닮았다”는 피드백을 들었고, 이를 통해 ‘바다’라는 테마를 떠올리게 되었습니다.

물론, 실시간 3D 그래픽으로 바다를 구현하는 것은 높은 기술적 난이도를 요구하지만, 도전해볼 가치가 있다고 판단했습니다.

이러한 과정을 거쳐, ‘인생을 바다에 비유하여, 항해 중 닻을 내린 정박지를 소개하는 컨셉’을 구상하였고, 프로젝트명을 **Anchor**로 확정하였습니다.

#### 2. 레이아웃 구성 및 콘티 작성
<p align="center">
  <img width=600 alt="anchor" src="https://postfiles.pstatic.net/MjAyNDA4MDhfMTcw/MDAxNzIzMDk1Mzg3NzA1.DNBFnaMDdWggQzSHHNqgA17siPilA9sFp4IHpNiSoS8g.0dKauKs28nwC65cNh-Fbj39K7jEHLSiXOu4TQfB6miQg.PNG/%EB%A9%94%EC%9D%B8_%EA%B5%AC%EC%84%B1.png?type=w966" />
<br>Anchor의 초기 컨셉안
</p>

초기 컨셉은 광활한 바다와 탁 트인 하늘을 배경으로, 사용자가 보트를 통해 여러 섬을 탐험할 수 있는 구조였습니다.

<p align="center">
  <img width=600 alt="anchor" src="https://postfiles.pstatic.net/MjAyNTAxMjlfMzIg/MDAxNzM4MTI5ODcyNzA2.hY25tfHSK6pkeo7mZoqCJKPFISuiuME2Wr7IsF1l3YMg.UjWZbBks6lW3ekO27wESCa3fia8QP83qC0Ksmv-0mxIg.PNG/%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B822_211.png?type=w966" />
</p>

처음에는 스크롤 이벤트를 통한 고정된 이동 경로와 다수의 섬을 계획했으나, 최종적으로는 사용자가 자유롭게 이동할 수 있는 키보드 인터랙션 방식을 채택하고, 접근 가능한 섬을 1개로 축소하여 개발을 진행했습니다.

<p align="center">
  <img width=600 alt="anchor" src="https://postfiles.pstatic.net/MjAyNTAxMjlfMjkz/MDAxNzM4MTI5ODcyNzM0.XglIo2TTqHfwQnfOG46jDJX0tEpctmiXC15FxCsGdjUg.8q3wibZtNCUcdXIDWwXmeJo-kHWsTfxJEvU1VN9qYv8g.PNG/%EA%B2%8C%EC%9E%84%EC%84%AC%EC%BD%98%ED%8B%B0.png?type=w966" />
<br>'게임 섬' 초기 컨셉안
</p>
<p align="center">
  <img width=600 alt="anchor" src="https://postfiles.pstatic.net/MjAyNTAxMjlfMTQ0/MDAxNzM4MTI5ODcyNzA0.WyNPpIAkbMvmIudVvunRDmBMtY6IogFQO7z65KWRcu8g.qAcgPAYYZTlJaVxN50nkt6Q2Eu3LghxXsJ3idETR4F4g.PNG/%EC%BD%98%ED%8B%B02.png?type=w966" />
<br> 포트폴리오 소개 UI 구상안
</p>

섬에 도착하면 상공에서 내려다보는 뷰로 전환되며, 섬 내 오브젝트들과 상호작용할 수 있도록 구성했습니다. <br>
또한, UI 버튼을 통해 포트폴리오의 상세 내용을 확인할 수 있도록 설계했습니다.

<br>

# 🛠️ 기술 스택
<div>
  <img alt="Static Badge" src="https://img.shields.io/badge/Javascript-%23F7DF1E?style=flat-square&logo=javascript&logoColor=black">
  <img alt="Static Badge" src="https://img.shields.io/badge/React-%2361DAFB?style=flat-square&logo=react&logoColor=black">
  <img alt="Static Badge" src="https://img.shields.io/badge/React Three Fiber-%23000000?style=flat-square&logo=threedotjs&logoColor=white">
  <img alt="Static Badge" src="https://img.shields.io/badge/Jotai-%23000000?style=flat-square&logo=jotai&logoColor=white"/>
  </br>
  <img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
  <img src="https://img.shields.io/badge/GSAP-93CF2B?style=flat-square&logo=greensock&logoColor=white"/>
  <img alt="Static Badge" src="https://img.shields.io/badge/Vite-%23646CFF?style=flat-square&logo=vitess&logoColor=white">
  <img alt="Static Badge" src="https://img.shields.io/badge/Vitest-%236E9F18?style=flat-square&logo=vitess&logoColor=white">
<div>


### ⚙️ React & React Three Fiber
1. **컴포넌트 단위의 3D 요소 관리**
   - Three.js의 3D 오브젝트들을 React 컴포넌트로 모듈화하여 관리할 수 있습니다.
   - 복잡한 3D 씬을 작은 단위의 컴포넌트로 분리하여 코드의 재사용성과 유지보수성을 높였습니다.
2. **상태관리의 용이성**
    - 사용자 인터랙션에 따른 카메라 이동, 오브젝트 상태 변화 등을 React의 상태 관리 시스템으로 효율적으로 제어할 수 있습니다.
    - useFrame, useThree 등 Three.js와 관련된 커스텀 훅을 활용해 애니메이션과 렌더링 로직을 단순화했습니다.
3. **WebGL 기반 3D 구현**
   - Three.js를 통해 브라우저에서 고성능 3D 렌더링을 구현할 수 있었습니다
   - React Three Fiber를 통해 선언적인 방식으로 Three.js를 사용할 수 있었습니다

### ⚙️ Jotai (상태 관리)
1. **효율적인 상태 관리**
   - atom 단위의 상태 관리로 3D 오브젝트별 독립적인 상태 관리가 가능했습니다
   - 카메라 위치, 오브젝트 상태 등을 컴포넌트 간에 효율적으로 공유할 수 있었습니다

2. **간결한 구현**
    - Context API 기반의 다른 라이브러리들과 비교했을 때 보일러플레이트가 적었습니다.
    - Bottom-up 방식의 상태 전파로 코드 작성이 직관적이었습니다.

### ⚙️ Styled Components (스타일링)
1. **컴포넌트 기반 스타일링**
   - React 컴포넌트와 동일한 방식으로 스타일을 관리할 수 있습니다.
   - 3D 씬의 상태에 따라 UI 스타일을 동적으로 변경할 필요성이 있는 상황에서, props를 통한 동적 스타일링이 직관적이었습니다.

### ⚙️ GSAP (애니메이션)
1. **타임라인 기반 제어**
   - 여러 요소의 애니메이션을 시간 순서대로 제어해야 했습니다.
   - GSAP의 타임라인 기능으로 복잡한 애니메이션 시퀀스를 관리할 수 있었습니다.

2. **성능**
   - CSS 애니메이션과 비교해 더 부드러운 성능을 제공했습니다.
   - 3D 트랜스폼과의 호환성이 우수했습니다.

<br>

# 🌊 구현 과정

### 💦 바다 구현하기

#### 1. 구현 목표
프로젝트의 주요 배경인 바다를 구현하는 것은 큰 도전 과제였습니다. 사실적인 바다 표현을 위해 다음과 같은 요소들이 필요했습니다.

  - 물의 반사와 투명도
  - 실시간으로 움직이는 파도
  - 물결에 따른 그림자 처리
  - 수면 아래의 깊이감 표현
  - 물의 굴절과 프레넬 효과

<br>

<p align="center">
  <img width=400 alt="anchor" src="https://postfiles.pstatic.net/MjAyNTAxMjlfNTUg/MDAxNzM4MTM0OTk2Mzk5.oQHAyB0MGqoZhQSt6lvvGz2aKajLTdH1UEP4IMIlL3sg.8XLEi34YSP4Ax5HJIoCeXjHUnOeBn9m5MRfmOqBieuog.GIF/%EB%B0%94%EB%8B%A4_(1).gif?type=w3840" />
  <br> 위 특징을 반영해 구현한 바다의 모습
</p>


#### 2. 셰이더를 활용한 물 표면 구현
<br><p align="center">
  <img width=400 alt="anchor" src="https://postfiles.pstatic.net/MjAyNDA4MDhfMTQ1/MDAxNzIzMDk4OTc4MDA2.BnZhs1bamVmYOSIJEmKffTCjGI5ZUtBnSAVvlHXS9Hwg.dcjLxztuv1FpCb-Mh9yfBBE9xUI4n3gaShGX3onN3LEg.PNG/SE-b6a5150e-0d14-4386-9e9a-46a284e6fe3b.png?type=w966" />

단순한 평면 메시를 사실적인 바다처럼 보이게 하기 위해 셰이더 머테리얼(Shader Material)을 활용하였습니다. 셰이더는 화면에 출력될 픽셀의 위치와 색상을 실시간으로 계산하는 함수입니다.

셰이더는 다음 두 가지 요소로 구성됩니다.

1. **버텍스 셰이더**: 물결의 움직임을 담당
    ```glsl
    float height = calculateWaveHeight(position.xz, u_time);
    vec3 displacedPosition = position + normal * height;
    ```
    - 시간에 따라 변화하는 파도의 높이를 계산
    - 여러 개의 사인 함수를 조합하여 자연스러운 파도 생성


2.  **프래그먼트 셰이더** : 물의 시각적 효과를 담당
    - 색상과 투명도 처리
    - 반사율 조정을 위한 프레넬 효과 적용
    - 수심에 따른 색상 변화 구현

<br>

#### 3. 반사 구현 과정의 도전 과제들

물에 비치는 반사를 구현하는 과정에서 여러 기술적 도전 과제들이 있었습니다.

**3-1. 반사 카메라 설정**

**(1) 최초 시도: 고정된 하향식 시점(직교 카메라) 사용**

  ```js
  reflectionCameraRef.current = new THREE.OrthographicCamera(
    -1250, 1250, 1250, -1250, 0.1, 2000
  );
  reflectionCameraRef.current.position.set(0, 1000, 0);  // 높은 위치에서
  reflectionCameraRef.current.lookAt(0, 0, 0);          // 아래를 바라봄
  ```
- 결과: 섬이나 보트의 반사가 물 표면의 엉뚱한 위치에 나타났습니다.
  <p align="center">
  <img src="https://postfiles.pstatic.net/MjAyNDA4MDhfMTIz/MDAxNzIzMTA0MTE0MzQ3.7dHw7TxiMrckwIllQyX2X69XbU-mnxv8knwv1WQm0CEg.dcGEIWhn2ouDQiAdRZzCIb9wN6cRQkzsL1DjzMVo6_Ag.PNG/%EC%9D%8C.png?type=w3840" width="600px">
  </p>

- 원인
  - 직교 카메라는 원근감 없이 위에서 수직으로 내려다보기만 합니다.
  - 반사되어야 할 이미지의 실제 위치 관계가 완전히 무시됩니다.
  - UV 좌표와 실제 공간 좌표 간의 관계가 맞지 않았습니다.

<br>

**(2) 두 번째 시도: 플레이어 시점 미러링**
```js
// 프래그먼트 셰이더에서 UV 좌표 계산 시도
vec2 uv = vWorldPosition.xz / 2500.0 + 0.5;
vec3 reflection = texture2D(reflectionMap, uv).rgb;
```
- 결과: 반사가 아예 보이지 않습니다.

  <p align="center">
  <img src="https://postfiles.pstatic.net/MjAyNDA4MDhfNTYg/MDAxNzIzMTA0MzQ1OTgx.POYIE-0vmIDpga2IgTOo_0wBGH8_DmQmDo6xbQLs4Wcg.4YHafN1f6pe1MjfNbMYxddjsJU4HKPjunIyVW323J4cg.PNG/%EC%9D%B4%EA%B2%8C%EB%AD%90%EC%95%BC.png?type=w966" width="600px">
  </p>
- 원인
  - `GL_INVALID_OPERATION: Feedback loop` 에러로 인해 반사 텍스처 자체가 생성되지 않는 상황입니다.
  - 셰이더가 반사 텍스처를 읽으려 할 때 해당 텍스처가 비어있는 상태일 수 있습니다.
  - 동일 프레임에서 텍스처를 그리면서 동시에 읽으려는 시도가 충돌하게 됩니다.

<br>

**(3) 최종 해결: 텍스처 매트릭스와 반사 카메라 결합**
```js
// 반사 카메라 위치 설정
reflectionCameraRef.current.position.set(
  camera.position.x,
  -camera.position.y + 2 * waterPosition.y,  // 수면 기준으로 반전
  camera.position.z
);

// 텍스처 매트릭스 세팅
textureMatrix.set(
  0.5, 0.0, 0.0, 0.5,  // 첫 번째 행
  0.0, 0.5, 0.0, 0.5,  // 두 번째 행
  0.0, 0.0, 0.5, 0.5,  // 세 번째 행
  0.0, 0.0, 0.0, 1.0   // 네 번째 행
);

// 텍스처 매트릭스로 정확한 반사 위치 계산
textureMatrix.multiply(reflectionCamera.projectionMatrix);
textureMatrix.multiply(reflectionCamera.matrixWorldInverse);
textureMatrix.multiply(meshRef.current.matrixWorld);
```

- 작동 원리
  1. 반사 카메라 설정
      - 플레이어 카메라의 위치를 수면 기준으로 반전시켜 반사 카메라를 생성합니다.
      - 반사 이미지를 별도의 렌더 타겟에 먼저 그립니다.
  2. 텍스처 매트릭스 변환
      - `textureMatrix`는 Three.js의 3D 좌표계(-1 ~ 1)를 텍스처 좌표계(0 ~ 1)로 변환하는 행렬입니다.
      - 대각선의 0.5: 좌표값을 절반으로 줄입니다. (-1 ~ 1 → -0.5 ~ 0.5)
      - 마지막 열의 0.5: 좌표를 0.5만큼 이동시킵니다. (-0.5 ~ 0.5 → 0 ~ 1)
  3. 반사 효과 적용
      - 계산된 텍스처 좌표를 사용하여 반사 이미지를 물 표면에 매핑합니다.
<br>

    이로써 정확한 반사 위치를 계산하고, 루프 에러를 해결할 수 있었습니다. <br>
    다만 이후에도 몇 가지 문제 상황이 이어졌습니다.

<br>

**3-2. 카메라 각도에 따른 반사 문제**

  <p align="center">
  <img src="https://postfiles.pstatic.net/MjAyNTAyMDhfMTgw/MDAxNzM5MDA5MTAzMzY4.NYEDZt93HgVW8ybTu0t20JEK5cj6seUhIa9ASzGWo8og.oLNlQQmDb6CMjk__5_l1AiBJ9n2rYtPPGHY6ZlKWfbAg.PNG/%EA%B0%81%EB%8F%84%EB%94%B0%EB%9D%BC%EC%84%9C.png?type=w3840" width="600px">
  </p>

- 문제 상황: 특정 카메라 각도에서 반사가 전혀 보이지 않았습니다.
- 해결 방법: 반사 카메라의 투영 행렬 업데이트를 추가했습니다.
  ```js
  reflectionCameraRef.current.position.set(
    camera.position.x,
    -camera.position.y + 2 * waterPosition.y,
    camera.position.z,
  );
  reflectionCameraRef.current.rotation.set(
    -camera.rotation.x,
    camera.rotation.y,
    camera.rotation.z,
  );
  reflectionCameraRef.current.updateProjectionMatrix();  // 추가된 부분
  ```

- 해결 원리
  1. 투영 행렬이란?
      - 3D 세계를 2D 화면에 표현하기 위한 변환 행렬입니다.
      - 3D 게임을 모니터로 볼 수 있는 것처럼, 3D 공간을 2D 화면에 투영하는 역할을 합니다.
      - 카메라의 시야각(FOV), 종횡비, 보이는 거리 범위 등의 정보를 포함합니다.

  2. 투영 행렬 업데이트의 필요성
      - 카메라가 움직일 때마다 투영 방식도 바뀌어야 합니다.
      - `updateProjectionMatrix()`는 카메라의 현재 상태를 반영하여 투영 행렬을 새로 계산합니다.
      - 이 업데이트가 없으면 카메라가 움직여도 예전 시점의 투영 방식이 유지되어 반사가 부자연스러워집니다.

  3. 반사에서의 역할
      - 반사 카메라는 실제 카메라를 뒤집어 놓은 것과 같습니다.
      - 투영 행렬 업데이트로 이 뒤집힌 시점에서 바라보는 화면을 정확하게 계산합니다.
      - 결과적으로 모든 카메라 각도에서 자연스러운 반사가 가능해집니다.

    useFrame 내에서 매 프레임마다 이 업데이트를 수행함으로써, 카메라의 모든 움직임이 물의 반사에 즉시 반영될 수 있었습니다.

<br>

**3-3. 화면 외곽의 텍스처 늘어짐 현상**

  <p align="center">
  <img src="https://postfiles.pstatic.net/MjAyNTAyMDhfNzQg/MDAxNzM5MDA5MTAzMzYy.lXWLBMkY97N5N6yXIwA7n8jiw5EsLgalCJgI2gmVCTYg.L-RXO-RDnuJdQc9qSz6qFH9QUMxTbTdhPE7nD8Wltc8g.PNG/%EB%90%90%EB%8B%A4%EB%A7%90%EC%95%98%EB%8B%A4.png?type=w3840" width="600px">
  </p>

- 문제 상황: 카메라를 회전시킬 때 화면 외곽에서 반사 이미지가 부자연스럽게 늘어나는 현상이 발생했습니다.
- 시도했던 방법들
  - UV 계산 방식 수정 시도
  - 클리핑 관련 코드 조정
  - 수면 왜곡 효과 제거 테스트
- 최종 해결 방법: 반사 카메라의 시야각(FOV)을 확장했습니다.

  ```js
  // 반사 카메라의 FOV를 넓게 설정
  reflectionCameraRef.current.fov = camera.fov * 1.8;

  // 해상도 저하 문제를 해결하기 위한 렌더 타겟 크기 증가
  const reflectionRenderTarget = new THREE.WebGLRenderTarget(
    size.width * 1.5,
    size.height * 1.5,
    {
      encoding: THREE.sRGBEncoding,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
    }
  );
  ```

- 해결 원리
  1. 클리핑 현상이란?
      - 뷰의 외곽 장면이 카메라의 시야 범위를 벗어나 사라지는 현상을 의미합니다.
      - 클리핑 현상으로 인해 물의 반사에서는 카메라 회전 시 반사되어야 할 부분이 잘려나가는 문제가 발생했습니다.

  2. 텍스처 샘플링이란?
      - 3D 공간의 특정 지점에서 텍스처의 색상값을 가져오는 과정입니다.
      - 반사 기능에서는, 물 표면의 각 지점에서 반사 이미지의 어느 부분을 보여줄지 결정하는데 사용됩니다.
      - 샘플링 영역이 좁으면 텍스처가 늘어나거나 왜곡되어 보일 수 있습니다.

  3. FOV 확장의 효과
      - FOV를 1.8배 늘림으로써 카메라가 더 넓은 범위를 볼 수 있게 되었습니다.
      - 광각 렌즈로 사진을 찍는 것과 비슷한 효과를 주었습니다.
      - 클리핑 현상이 감소하여 카메라가 회전하더라도 반사되어야 할 부분이 잘리지 않습니다.
      - 텍스처 샘플링 영역을 확대하여 텍스처가 늘어지거나 왜곡되는 현상을 줄였습니다.

  이러한 과정을 통해 모든 각도에서 자연스러운 반사 효과를 구현할 수 있었습니다. 다만 FOV 값 증가로 인한 해상도 저하는 렌더 타겟의 크기를 키워 보완해야 했습니다.

<br>

#### 4. 파도와 물결 움직임 구현
**4-1. 버텍스 셰이더에서의 파도 계산**
```glsl
float calculateWaveHeight(vec2 position, float u_time) {
  float height = 0.0;
  vec2 pos = position * 0.1;  // 파도의 전체적인 크기 조절

  // 큰 파도
  height += sin(pos.x * 1.8 + u_time * 1.2) * 0.15;
  height += sin(pos.y * 2.2 + u_time * 0.8) * 0.12;

  // 교차하는 파도
  height += sin(pos.x * 0.9 + pos.y * 1.3 + u_time * 1.5) * 0.1;

  // 작은 물결
  height += sin(pos.x * 5.0 + u_time * 2.0) * 0.05;
  height += sin(pos.y * 4.5 + u_time * 2.2) * 0.04;

  return height * u_waveHeight;
}
```

- 여러 개의 sin 함수를 중첩하여 다양한 크기의 파도를 생성합니다.
- 시간에 따라 변화하는 동적인 파도를 구현했습니다.
- x축과 y축 방향의 파도를 조합하여 자연스러운 움직임을 표현하였습니다.

<br>

#### 5. 물의 시각적 효과 구현
**5-1. 깊이감 표현하기** <br>
- 구현의 필요성 <br>

  일반적으로 현실의 물은 깊이에 따라 색이 변합니다. 깊은 바다는 햇빛이 닿지 않아 어두워지고, 얕은 물은 빛이 투과되어 밝게 보입니다. <br>
  Anchor에서는 지형에 따른 수심의 차이가 거의 존재하지 않습니다. 실제 지형의 깊이 차이보다는, 화면상에서 보이는 깊이(Screen-Space Depth)를 활용하여 더욱 자연스러운 물의 느낌을 구현하고자 했습니다. 또한, 과장적인 색상 표현으로 동화적인 분위기를 연출하고자 하였습니다.

  - 실제 물의 성질 반영 → 현실에서 먼 곳의 물이 더 어두워 보이는 현상을 표현
  - 단조로운 표현 방지 → 깊이 변화가 크지 않아도, 화면에 표현되는 물이 더 자연스럽고 입체적으로 보임
  - 사용자 경험 향상 → 시각적으로 거리감을 강조하여 몰입감을 높임

<br>

- 주요 원리

  깊이가 얕을수록 밝고 푸른 색을 띠며, 깊어질수록 어두운 색으로 변합니다. <br> 이를 위해 깊이 정보(Depth) 기반 보간(Interpolation)과 지수 함수(Exponential Function) 를 활용하였습니다.

  1. 깊이 정보 계산

      ```glsl
      float sceneDepth = gl_FragCoord.z / gl_FragCoord.w;
      ```
      - `gl_FragCoord.z` : 현재 픽셀의 깊이값(Z-buffer)
      - `gl_FragCoord.w` : 동일 픽셀의 w 좌표
      - `sceneDepth` : 정규화된 깊이값 (0에 가까울수록 얕고, 값이 클수록 깊음)

    - 결과
      - 깊이가 증가할수록 `sceneDepth` 값이 커집니다.

     <br>

  2. 깊이에 따른 색상 보간
      ```glsl
      vec3 shallowColor = vec3(0.5, 0.9, 0.9);  // 얕은 물 색상
      vec3 deepColor = vec3(0.6, 0.2, 0.9);     // 깊은 물 색상

      float sceneDepthFactor = smoothstep(0.0, 10.0, sceneDepth);
      vec3 depthColor = mix(shallowColor, deepColor, sceneDepthFactor);
      ```

      	- `smoothstep(0.0, 10.0, sceneDepth)`
          - 깊이가 0~10 범위일 때 부드럽게 0에서 1로 변화
        - `mix(shallowColor, deepColor, sceneDepthFactor)`
          - 깊이에 따라 얕은 물 색상에서 깊은 물 색상으로 점진적 변화

  - 결과
	  - 얕은 부분 (`sceneDepth = 0`) → 밝은 하늘색
	  - 깊은 부분 (`sceneDepth = 10` 이상) → 보라색 계열

    <br>

  3. 지수 함수를 활용한 깊이감 표현

      ```glsl
      float sceneWaterDepth = 1.0 - exp(-sceneDepth * 0.055);
      ```

      - `exp(-sceneDepth * 0.055)`
        - 깊이가 작을 때는 값이 1에 가까우며, 깊이가 커질수록 0에 가까워집니다.
      - `1.0 - exp(-sceneDepth * 0.055)`
        - 반전시켜 깊이가 클수록 값이 1에 가까워집니다.

    - 결과:
      - 깊이가 얕을 때: `sceneWaterDepth` 값이 0에 가까워집니다.
      - 깊이가 깊을 때: `sceneWaterDepth` 값이 1에 가까워집니다.
      - 비선형적인 변화로 더욱 자연스러운 색상 전환이 가능합니다.

<br>

  4. 최종 색상 조합

      ```glsl
      finalColor = mix(depthColor * 6.0, finalColor, sceneWaterDepth);
      ```
      - `depthColor * 6.0`
        - 기본적으로 물의 색상을 강조하여 밝기를 증가시켰습니다.
	    - `mix(depthColor * 6.0, finalColor, sceneWaterDepth)`
        - `sceneWaterDepth` 값이 클수록 `finalColor`(기존 화면 색상) 비율을 증가시킵니다.

  - 결과
	- 깊이가 얕을 때 → `depthColor * 6.0` (강한 물 색상 유지)
	- 깊이가 깊을 때 → 기존 `finalColor`(화면 원래 색상)와 더 많이 섞여 물 속이 더 어두워집니다.

<br>

**5-2. 프레넬 효과** <br>
- 구현의 필요성 <br>

  현실에서 물의 표면은 관찰하는 각도에 따라 반사되는 빛의 강도가 달라지는 특성을 가집니다.
    - 물을 비스듬히 바라보면 반사가 강해져 거울처럼 보이고,
    - 수직으로 내려다보면 반사가 약해져 물속이 더 잘 보이게 됩니다.

  이러한 현상을 프레넬 효과(Fresnel Effect) 라고 하며, 이는 단순한 반사 표현보다 더욱 사실적인 수면 렌더링을 가능하게 합니다.

<br>

- 주요 원리 <br>

  프레넬 효과를 적용하기 위해, 시선 방향과 수면의 법선 벡터의 내적(Dot Product)을 활용하여 반사의 강도를 조절하였습니다.

  1. 시선 벡터(View Direction)와 수면 법선(Water Normal)의 내적(dot product) 계산
      - 내적 값이 1에 가까울수록(수직) → 반사가 약해지고 물이 더 투명해집니다.
      - 내적 값이 0에 가까울수록(비스듬한 각도) → 반사가 강해집니다.

  <br>

	2. 프레넬 강도(Fresnel Factor) 계산

        ```glsl
        float fresnelFactor = pow(1.0 - dot(viewDirection, waterNormal), u_fresnelStrength);
        fresnelFactor *= u_reflectionStrength;
        ```
        - `1.0 - dot(viewDirection, waterNormal)` : 수면을 바라보는 각도를 반영
        - `pow(..., u_fresnelStrength)` : 프레넬 효과를 조절하는 강도 조절
        - `fresnelFactor *= u_reflectionStrength;` : 반사 효과의 최종 강도 적용

  <br>

- 결과
  - 이러한 계산을 통해, 사용자가 물을 바라보는 각도에 따라 자연스럽게 반사가 변하는 효과를 구현할 수 있었습니다.
    - 비스듬한 각도에서는 거울처럼 반사가 강해지고,
    - 수면을 정면에서 바라볼수록 투명해지는 사실적인 수면 표현이 가능해졌습니다.

<br>

**5-3. 그림자 처리** <br>
- 구현의 필요성 <br>
  현실에서 그림자는 광원의 특성과 환경에 따라 경계가 뚜렷하기도 하고, 부드럽게 번지기도 합니다. <br>
  특히 물속 그림자는 빛의 굴절과 확산으로 인해 경계가 뚜렷하지 않고 자연스럽게 퍼지는 특징이 있습니다.

  단순한 하드 그림자(Hard Shadow) 방식으로 구현하면 그림자의 경계가 날카롭고 인위적으로 보일 수 있습니다.
  이를 해결하기 위해 PCF(Percentage Closer Filtering) 기법을 활용하여 부드러운 그림자를 구현하였습니다.

  <br>

- 주요 원리 <br>
  PCF는 그림자 맵에서 여러 샘플을 가져와 평균을 내는 방식으로, 그림자의 경계를 부드럽게 만드는 필터링 기법입니다.
  - 단일 샘플링 방식(하드 그림자) → 그림자 경계가 날카로움
  - 다중 샘플링(PCF) → 그림자가 자연스럽게 퍼짐

1. 기본 그림자 값 계산

```glsl
float shadow = getShadow(vShadowCoord);
```

- `getShadow(vShadowCoord)`: 그림자 맵에서 기본적인 그림자 값 샘플링 (* 샘플링: 여러 지점에서 값을 가져오는 것)
- 단순한 하드 그림자를 계산하는 단계
      
<br>

2. 블러 처리된 그림자 값 계산

```glsl
float blurred = blurShadow(vShadowCoord);
```

- `blurShadow(vShadowCoord)`: 여러 샘플을 이용해 평균을 내어 그림자를 부드럽게 만듦
  
<br>

3. PCF를 활용한 부드러운 그림자 적용

```glsl
float finalShadow = mix(shadow, blurred, 0.0001);
```

- `mix(shadow, blurred, 0.0001)`: 기본 그림자 값과 블러 처리된 그림자를 적절히 혼합
- 0.0001은 블러의 강도를 조절하는 역할
  
<br>

  4.	그림자를 최종 색상에 반영
        ```glsl
        vec3 shadowColor = mix(u_shadowColor, vec3(1.0), finalShadow);
        finalColor = mix(finalColor, finalColor * shadowColor, 1.3);
        ```

        - 그림자 색과 기본 조명을 혼합하여 부드러운 그림자 색상 생성
        - 최종적으로 물 표면에 그림자를 적용하여 자연스러운 효과를 구현
    
<br>

**5-4. 텍스처 적용** <br>

  <p align="center">
  <img src="https://postfiles.pstatic.net/MjAyNTAyMTBfNDcg/MDAxNzM5MTQ5NjAyOTY0.hkipI3S4TWzcKCExUtenOE3RmH9itFhbPkq0IwwE-Kgg.APLMCaZN4UrsH5Z0_Vflhs1AmfEdRpjOtqOR0Gx4ZaYg.PNG/%EC%82%AC%EC%9A%A9%ED%85%8D%EC%8A%A4%EC%B2%98.png?type=w3840" width="600px">
  <br>바다 표현에 사용된 텍스처
  </p>


물의 사실적인 표현을 위해 여러 종류의 텍스처를 조합하여 사용하였습니다.

1. 앰비언트 오클루전 맵 (Ambient Occlusion Map)

    ```glsl
    vec3 ao = texture2D(u_aoTexture, distortedUV).rgb;
    finalColor *= ao;  // 최종 색상에 AO 효과 적용
    ```
    - 표면의 틈새나 굴곡에 의해 생기는 자연스러운 그림자를 표현합니다.
    - 밝은 부분(1.0)은 빛이 잘 닿는 곳, 어두운 부분(0.0)은 빛이 잘 닿지 않는 곳을 의미합니다.

<br>

2. 하이트맵 (Height Map)

    ```glsl
    float heightSample = texture2D(u_heightTexture, distortedUV).r;
    vec3 waterNormal = normalize(vNormal + normal * 0.5 + vec3(0.0, 0.0, heightSample * 0.2));
    ```
    - 흑백 이미지로, 밝은 부분은 높고 어두운 부분은 낮은 지점을 나타냅니다.
    - 물결의 높낮이를 표현하는데 사용됩니다.

<br>

3. 노말맵 (Normal Map) <br>

    - 표면의 법선 벡터(수직 방향)를 RGB 색상으로 표현한 텍스처입니다.
    - RGB 각 채널이 XYZ 방향을 나타내며, 이를 통해 빛이 어떻게 반사될지를 결정합니다.

<br>

4. 러프니스맵 (Roughness Map) <br>

    - 표면의 거칠기를 나타내는 텍스처입니다.
    - 값이 클수록 빛이 흩어져 반사되어 거칠게 보이고, 작을수록 반사가 선명하게 보입니다.
    - 16x16의 작은 해상도를 사용했습니다.
      - 물의 거칠기는 미세하고 균일한 패턴을 가지므로 높은 해상도가 불필요합니다. <br>
      - 작은 텍스처로도 충분한 효과를 얻을 수 있어 메모리와 성능 최적화를 고려했습니다.

<br>

타일링 기법으로, 위 텍스처를 반복 사용하여 작은 텍스처의 사이즈로 끊김 없이 물 표면을 구현할 수 있었습니다.
```js
// 반복 설정
aoTexture.wrapS = aoTexture.wrapT = THREE.RepeatWrapping;
normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping;
roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping;
heightTexture.wrapS = heightTexture.wrapT = THREE.RepeatWrapping;
```

<br>



### ⛵ 보트의 이동

#### 1. 구현 목표
보트가 해상에서 자연스럽게 움직이도록 하기 위해 다음과 같은 목표를 설정하였습니다.
- 수면 위에서의 자연스러운 이동 구현
- 부드러운 방향 전환
- 섬과의 자연스러운 충돌 구현
<br>

#### 2. 이동 시스템 구현
**2-1. 기본 이동 원리** <br>
보트의 이동을 구현하기 위해 삼각함수를 활용하였습니다. 삼각함수는 각도에 따른 이동 방향을 계산하는 데 유용하게 사용됩니다.

  <p align="center">
  <img src="https://postfiles.pstatic.net/MjAyNTAyMDhfMzMg/MDAxNzM4OTg1MzcyNDcy.BrbN3FqNYSU7ukmxDq1tygUtl3y6UzWBNzkq05VYHEcg.CUwW7tty1oe4F4bbrm7FIjnxHGyVQYUCF1u7QkiFiRYg.GIF/%EC%82%BC%EA%B0%81%ED%95%A8%EC%88%98%EA%B0%9C%EC%9A%94.gif?type=w3840">
  <br>
  </p>


  ```js
  newPosition.x -= MOVE_DISTANCE * Math.cos(rotation);
  newPosition.z += MOVE_DISTANCE * Math.sin(rotation);
  ```
`Math.cos`와 `Math.sin`은 각각 보트의 회전 각도에 따라 전체 이동 거리(`MOVE_DISTANCE`)를 x축과 z축에 어떤 비율로 나눌지를 결정합니다. 이 함수들은 -1에서 1 사이의 값을 반환하여 각 축의 이동 비율을 정합니다.

  <p align="center">
  <img src="https://postfiles.pstatic.net/MjAyNTAyMDhfMiAg/MDAxNzM5MDAyNjU4MTUy.rn2hMTsbNRsiQSzVRf4Dzcw18uD5cPEs5HJ4RpIZ-38g.oYEPudsLObEjuKJwWqMDuE43wodxz49oBUSCKgwqe78g.PNG/%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8.png?type=w3840" width="600px">
  <br>
  </p>


예시:

- rotation = 0 일 때 (보트가 X축 음의 방향을 향할 때)
  - cos(0) = 1,  sin(0) = 0
  - X축으로 -MOVE_DISTANCE만큼, Z축으로 0만큼 이동

- rotation = π/2 일 때 (보트가 Z축 양의 방향을 향할 때)
  - cos(π/2) = 0,  sin(π/2) = 1
  - X축으로 0만큼, Z축으로 +MOVE_DISTANCE만큼 이동

- rotation = π/4 일 때 (45도, 대각선 방향)
  - cos(π/4) = 0.707,  sin(π/4) = 0.707
  - X축으로 -MOVE_DISTANCE*0.707만큼
  - Z축으로 +MOVE_DISTANCE*0.707만큼 이동

<br>

**2-2. 조작 시스템** <br>
사용자의 키보드 입력에 따라 다음과 같이 보트를 제어할 수 있도록 구현하였습니다.

- 전/후진 (W/S키)
  - 보트의 현재 회전 각도를 기준으로 이동 방향이 결정됩니다.
  - 일정한 이동 거리(MOVE_DISTANCE)를 설정하여 속도를 제어합니다.

- 회전 (A/D키)
  - THREE.Euler 객체를 사용하여 3D 공간에서의 회전을 표현하였습니다.
  - 한 번의 키 입력당 2.8125도(Math.PI/64)씩 회전하도록 설정하였습니다.

<br>

**2-3. 부드러운 움직임 구현** <br>
급격한 움직임을 방지하고 자연스러운 이동을 구현하기 위해 선형 보간(Linear Interpolation, LERP)을 적용하였습니다.
```js
// 이동과 회전 모두에 보간을 적용하여 부드러운 전환을 구현하였습니다
boatRef.current.position.lerp(newPos, MOVE_SPEED);
boatRef.current.rotation.y = THREE.MathUtils.lerp(
  current.y, target.y, ROTATION_SPEED
);
```
<br>

**2-4. 해수면 효과** <br>
보트가 실제로 물 위에 떠 있는 것처럼 보이도록 다음과 같은 효과를 구현하였습니다.
- 사인 함수를 활용하여 수직 방향의 움직임을 만들었습니다
- 시간에 따라 보트의 높이가 자연스럽게 변화하도록 하였습니다
- 물결에 따라 보트가 기울어지는 효과를 추가하였습니다

<p align="center">
<img src="https://postfiles.pstatic.net/MjAyNTAyMDhfNjIg/MDAxNzM5MDAwMTQwOTEz.S2ACf2IkA4eFyFbBuJTI7vXa7QFHylh2-KCpwoLsx5Yg.Zwh7YSO6GSR3TzCEaN7beL0OFk3OD1sSXGIn1a6EDwwg.GIF/%ED%99%94%EB%A9%B4_%EA%B8%B0%EB%A1%9D_2025-02-08_%EC%98%A4%ED%9B%84_4.33.59.gif?type=w3840" width="600px">
<br>보트의 이동 구현 모습
<br>
</p>

#### 3. 충돌 시스템 구현
보트가 이동하며 다른 메쉬와 동일한 좌표에 위치하게 되었을 때, 두 메쉬가 겹쳐 보이게 됩니다. 이를 방지하기 위해서는 보트와 섬 간의 충돌 구현이 필요했습니다.
    <p align="center">
    <img src="https://postfiles.pstatic.net/MjAyNTAyMDhfMTgg/MDAxNzM4OTc5OTc0MjY0.TycAjqvUmndPX_ga48vaqZd3AMETDp_mEmTsaq7GVMwg.34b1rmnARfCidzvq8x9t7d4lp2W1NgnIVSnvnaQT7x4g.GIF/%EC%B6%A9%EB%8F%8C%EA%B5%AC%ED%98%84%EC%A0%84.gif?type=w3840" width="600px">
    <br>충돌 구현 전, 섬을 자유자재로 파고드는 보트
    <br>
    </p>
three.js에서 제공하는 `raycaster`를 활용해 충돌 시스템을 구현해볼 수 있었습니다.
`raycaster`는 보이지 않는 선(ray)을 쏘아 해당 경로에 있는 물체를 감지하는 방식으로 작동합니다. <br>

**3-1. 초기 구현** <br>
처음에는 다음과 같은 방식으로 충돌을 구현하였습니다.
- 레이캐스터를 사용하여 3방향으로 충돌을 감지하였습니다
- 섬의 메시와 직접적으로 충돌을 계산하였습니다
- 단순한 반사 벡터를 이용하여 충돌 시 보트가 반대 방향으로 튕겨나가도록 하였습니다.

<br>

**3-2. 문제 발생** <br>

  <p align="center">
  <img src="https://postfiles.pstatic.net/MjAyNTAyMDhfMTgz/MDAxNzM4OTgwMjY1OTA0.B_lrFA93_6COQwpWoaa6OG_PMtqivrE9rpeJK8oh1qkg.B48jl5s99MDPPAy982nTKhXjDnqRhUmMu8RM8jbTnHIg.GIF/%EB%AD%89%ED%88%AD%ED%95%9C%EB%B6%80%EB%B6%84%EC%97%90%EC%84%9C%EB%AF%B8%EB%81%84%EB%9F%AC%EC%A0%B8%ED%8C%8C%EB%AC%BB%ED%9E%98.gif?type=w3840" width="600px">
  <br>뭉툭한 면과 충돌 시 오히려 섬 쪽으로 끌려가는 모습
  <br>
  </p>

  <p align="center">
  <img src="https://postfiles.pstatic.net/MjAyNTAyMDhfMTA5/MDAxNzM4OTgwMjczOTg5.DWdh0xlQoqdC2fNMqKmYbVVLkKgYbaAZHO0m9QlKDMAg.mNeOcbk1dIkbRZS5Z9_NoVWvvqeucyHvOtg7RTKk6KAg.GIF/%EB%9A%AB%EA%B3%A0%EB%82%98%EA%B0%90.gif?type=w3840" width="600px">
  <br>계속 나아갈 경우 그대로 섬을 파고듦
  <br>
  </p>

문제의 원인으로 두 가지 요소를 추정하였습니다.
- 너무 정교한 섬의 메쉬: 섬 메쉬를 직접 감지하고 있는데, 섬 메쉬는 모양이 복잡하고 폴리곤이 많아 계산이 복잡하고 노말이 원하는 방향을 가리키지 않을 가능성이 컸습니다.
- 3방향의 단순한 레이캐스터: 보트의 충돌을 정교하게 구현하기에 지금의 3방향 감지 로직은 지나치게 단순하다고 판단되었습니다.

<br>

**3-3. 개선된 충돌 시스템**<br>

초기 구현의 한계를 극복하기 위해 다음과 같이 시스템을 개선하였습니다.

- 충돌 메시 단순화
  <p align="center">
  <img src="https://postfiles.pstatic.net/MjAyNTAyMDhfMTg4/MDAxNzM4OTgwNjI5NzI2.tPJIkVF0n9ha0c_SPoWxOWmQe7f27gCGJopNiIiZVfcg.hKWWImxUD4hYkrsSj6WJYvFDWKGtMVqCLtfQkpb5YGAg.PNG/%EC%BB%AC%EB%9D%BC%EC%9D%B4%EB%8D%94.png?type=w966" width="600px">
  <br>충돌 메쉬: 디버깅을 위해 붉은 색으로 wireframe을 씌워준 상태
  <br>
  </p>

  - 섬을 감싸는 단순한 실린더형 충돌 메시를 도입하였습니다.
  - 이를 통해 계산 효율성을 높이고 더 안정적인 충돌 처리가 가능해졌습니다.

- 전방향 충돌 감지
  - 360도 모든 방향으로 레이캐스팅을 수행하도록 개선하였습니다.
  - 15도 간격으로 레이를 발사하여 더 정확한 충돌 감지가 가능해졌습니다.

- 향상된 충돌 응답
  - 충돌 깊이에 따라 동적으로 반발력이 조절되도록 구현하였습니다.
  - 보트의 진행 방향을 고려하여 더 자연스러운 충돌이 일어나도록 하였습니다.
  - 여러 지점에서 동시에 충돌이 발생할 경우를 대비한 처리 로직을 추가하였습니다.

<p align="center">
<img src="https://postfiles.pstatic.net/MjAyNTAyMDhfMTg1/MDAxNzM4OTgxNjA4NjI3.Hu8SqM_2aQQ7DoKDnZbVvvq5fWYVX1WkozgAEF4tIt8g.Z05IYuoVaVjunbXLg2qtiTe_xJE0nDUfCDzHhGUXcGUg.GIF/%ED%99%94%EB%A9%B4_%EA%B8%B0%EB%A1%9D_2025-02-08_%EC%98%A4%EC%A0%84_11.23.16_(1).gif?type=w3840" width="600px">
<br>충돌 기능의 최종 구현 형태
<br>
</p>

<br>

**3-4. 향후 개선 사항**
<br>

현재 시스템의 한계점과 개선 방향은 다음과 같습니다.
- 섬의 실제 형태에 더 정확하게 맞는 충돌 메시를 제작할 필요가 있습니다.
- 이를 통해 충돌 감지의 정확도를 높이고 더 자연스러운 상호작용이 가능할 것으로 기대됩니다.

<br>

### 🏝️ 섬에서의 상호작용

#### 1. 자판기 캔 뽑기 이벤트
게임 섬에는 자판기 오브젝트를 클릭하면 음료수 캔이 굴러나오는 이벤트가 존재합니다.<br><br>
*자판기 클릭 시 → 캔이 특정 범위 내 랜덤 위치에서 생성되어 → 떨어져 구르다가 멈춥니다.* <br><br>
위 이벤트를 의도대로 구현하였으나, 한 가지 문제 상황이 발생했습니다.

<br>

**1-1. 문제 발생** <br>
첫 번째 캔이 생성될 때 화면 전체가 흰색으로 깜빡이는 현상이 발생했습니다. 원인을 추적하기 위해 `console.log`를 추가했을 때 점멸 현상이 사라지는 것을 발견했습니다. <br> 이를 통해 이 문제가 렌더링 타이밍과 관련된 **렌더링 경쟁(Race Condition)** 상황임을 유추할 수 있었습니다.

<p align="center">
<img src="https://postfiles.pstatic.net/MjAyNTAyMTdfMjE2/MDAxNzM5NzQ4MzkzMDM2.s4ZONkhP-RaOVhY29hFiaOCb3PCRNzRt0nIGC-iGfvsg.WoMqFV_T0ym44LXpt-L36rKFlffM7Wfz2A-RT1UJR14g.GIF/%ED%99%94%EB%A9%B4%EA%B9%9C%EB%B9%A1%EC%9E%84.gif?type=w3840" width="600px">
</p>

<br>

**1-2. 원인 분석** <br>
첫 번째 캔 생성 시: <br>
- Can 컴포넌트의 최초 마운트와 리소스(메시, 텍스처, 물리 시뮬레이션) 초기화가 발생
- 이 초기화 과정이 React의 상태 업데이트, Three.js의 씬 그래프 변경과 동시에 실행
- 결과적으로 포스트프로세싱 효과(Bloom, DepthOfField 등)의 재계산이 렌더링 사이클과 충돌하여 점멸 현상 발생

두 번째 캔부터는 이미 초기화된 리소스를 재사용하기 때문에 점멸 현상이 발생하지 않았습니다.

<br>

**1-3. 해결 방법** <br>
`requestAnimationFrame`을 사용하여 캔 생성 로직을 브라우저의 다음 애니메이션 프레임으로 지연시켰습니다.
```js
const handleClick = useCallback((event) => {
  if (!isEnterIsland || isLandMenuOpen) return;
  event.stopPropagation();

  if (cans.length < 5) {
    requestAnimationFrame(() => {
      const newCan = {
        id: Date.now(),
        position: [
          -490 + (Math.random() - 0.5) * 25,
          10 + Math.random() * 2,
          -420 + (Math.random() + 0.5) * 20,
        ],
      };
      setCans(prevCans => [...prevCans, newCan]);
    });
  }
}, [isEnterIsland, isLandMenuOpen, cans.length]);
```

<br>

**1-4. 작동 원리** <br>
1. `requestAnimationFrame`은 브라우저의 다음 리페인트 직전에 콜백 함수 실행을 예약
2. 이를 통해 Can 컴포넌트의 초기화, React 상태 업데이트, Three.js 렌더링이 동일한 프레임에서 처리됨
3. 결과적으로 렌더링 파이프라인이 안정화되어 점멸 현상이 해결됨

`requestAnimationFrame`은 브라우저의 렌더링 사이클과 정확히 동기화되어 작동하며, 일반적인 `setTimeout`과 달리 화면 주사율(60FPS)에 맞춰 실행됩니다. 이를 통해 3D 렌더링의 안정성과 성능을 보장할 수 있었습니다.
<br>

<p align="center">
<img src="https://postfiles.pstatic.net/MjAyNTAyMTdfMjQ3/MDAxNzM5NzQ4NDA3NzY2.owtM2NzUljNq8hGHtAvSo-7Epl-I92wgtffeJDV5Xokg.PThvzFzNHxg1vvsBtU8yZs6smI7gBuVQt9qxnWNXPVgg.GIF/%EA%B0%9C%EC%84%A0%ED%9B%84.gif?type=w3840" width="600px">
<br> 개선 후 점멸이 사라진 모습
</p>

<br>

# 🔧 향후 개선 사항

앞으로 다음과 같은 기능을 추가/개선하여 Anchor 프로젝트를 발전시켜나갈 예정입니다.

* [ ] 튜토리얼 (조작 안내)<br>
   현재 조작 방식에 대한 안내가 이루어지지 않아 사용자가 처음 웹에 방문한 사용자에게 혼란을 야기할 수 있을 거 같습니다. 조작에 대한 안내를 추가하여 사용자 경험을 개선할 예정입니다. <br><br>
* [x] 소품을 제작 및 배치하여 그래픽 환경 보완<br>
   나무와 돌처럼 반복적으로 배치할 수 있는 소품을 제작하고 배치할 예정입니다. 사용자가 3D 공간을 보다 자연스럽고 조화롭게 느낄 수 있었으면 합니다.<br><br>
* [ ] 보트 물결 이펙트 추가<br>
  보트 이동 경로에 맞추어 생성되는 물결 이펙트를 구현하여 보트의 움직임을 더욱 현실감있게 만들고자 합니다.
   <br><br>
 * [ ] 추가 섬 개발<br>
다른 프로젝트, 포트폴리오를 반영하여 보여줄 수 있는 메인 섬 1개를 추가 개발하고자 합니다.<br>

<br>

# 🗓️ 개발 일정

**1차 개발 (2024.07) - 3주**

| 날짜 | 개발 내용 |
|------|-----------|
| 07.08 ~ 11 | 프로젝트 구상 및 기획 |
| 07.12 | 프로젝트 세팅 |
| 07.13 ~ 31 | • 화면 구현<br>• 그래픽 리소스 제작<br>• 물, 광선, 발광 셰이더 구현<br>• 보트의 이동<br>• GameLand 제작 및 이벤트 구현 |

<br>

**2차 개발 (2025.02) - 2주**

| 날짜 | 개발 내용 |
|------|-----------|
| 02.02 ~ 05 | 프로젝트 디렉토리 구조 변경, 리팩토링 |
| 02.06 ~ 08 | 충돌 기능 구현 |
| 02.09 ~ 15 | 버그 픽스 및 기능 추가 개발 |
| 02.15 ~ 16 | 그래픽 개선 (나무, 돌 프랍 배치) |

<br>

# 💻 개발 후기

'상호작용 할 수 있는 요소로 가득한 3D 웹사이트를 개발하고 싶다.'라는 간단한 바람에서 출발하여 지금의 모양새를 갖추기까지 우여곡절이 많았습니다! <br><br>최초 기획 단계에서 주어진 개발 기간에 비해 프로젝트의 볼륨을 크게 잡는 바람에 많은 부분을 타협하게 된 것이 아쉽기도 합니다. 나의 능력과 시간, 개발 공수를 객관적으로 파악하고 계획을 세우는 것의 중요성을 다시금 느꼈습니다. <br><br> 1차 개발과 2차 개발의 공백기 동안 실무에서 개발자로 일할 소중한 기회를 얻어, 업무를 하고 돌아왔는데요. 돌아오니 제 코드에서 아쉬운 부분이 많이 보였다는 사실이 신기하고 또 기쁘기도 했습니다. <br><br> 애착을 가지고 개발한 포트폴리오 웹사이트이니만큼 시간을 들여 추가 개발과 리팩토링을 진행해 보려고 합니다😊!
