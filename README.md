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

- [🛟 주요 기능](#-주요-기능)
- [⛵ 프로젝트 기획](#-프로젝트-기획)
- [🛠️ 기술 스택](#-기술-스택)
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
- [🔧 향후 개선 사항](#-향후-개선-사항)
- [🗓️ 개발 일정](#️-개발-일정)
- [🏝️ 개발 후기](#️-개발-후기)

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

게임 개발, 특히 3D 배경 그래픽 분야에서 쌓은 전공 경험을 바탕으로 웹 개발이라는 새로운 도전을 시작하게 되었습니다. 게임 콘텐츠 제작에서 나아가 실용적인 웹 서비스 개발에 관심을 갖게된 지금에도 3D 그래픽에 대한 저의 열정을 잃지 않았습니다.

3차원 공간이 가진 생동감은 사용자의 몰입도를 높이는 강력한 도구라고 생각합니다. 이에 평면적인 웹사이트를 넘어, 사용자의 기억에 깊이 남을 수 있는 역동적인 3D 웹 경험을 설계하고자 했습니다.

3D 그래픽과 웹 개발을 접목하는 이번 도전은 제게 특별한 의미를 가집니다. 이는 단순한 기술 스택의 확장을 넘어, 제가 추구하는 개발자로서의 정체성을 표현하는 기회이기도 했습니다. 그렇게 첫 개인 프로젝트로 '3D 요소를 역동적으로 표현한 포트폴리오 웹사이트'를 기획하게 되었습니다.
### 💭 기획 과정
#### 1. 컨셉 결정
자기표현의 수단으로 가장 적절한 컨셉을 고민하는 과정에서, 주변인들의 의견이 큰 도움이 되었습니다. 끊임없이 변화하는 기술의 바다 속에서 꾸준히 성장해나가는 모습이 항해하는 배와 닮았다는 피드백을 받았습니다. '바다' 구현의 기술적 난이도에 대한 우려가 있었으나, 도전 가치가 있다고 판단했습니다.

이러한 고민 끝에 인생을 바다에 비유하여, 항해 중 닻을 내린 정박지를 소개하는 컨셉으로 **'Anchor'** 라는 프로젝트명을 확정하였습니다.

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

// 텍스처 매트릭스로 정확한 반사 위치 계산
textureMatrix.multiply(reflectionCamera.projectionMatrix);
textureMatrix.multiply(reflectionCamera.matrixWorldInverse);
textureMatrix.multiply(meshRef.current.matrixWorld);
```

- 작동 원리
  - 플레이어 카메라의 위치를 수면 기준으로 반전시켜 반사 카메라 생성합니다.
  - 반사 이미지를 별도의 렌더 타겟에 먼저 그립니다.
  - 텍스처 매트릭스로 정확한 반사 위치를 계산하여 물 표면에 매핑합니다.
  - 프레넬 효과를 적용하여 보는 각도에 따라 반사 강도 조절하였습니다.

이로써 정확한 반사 위치를 계산하고, 루프 에러를 해결하였으며 물의 반사가 시점 변화에 따라 자연스럽게 이루어지게 구현할 수 있었습니다.

다만 이후에도 몇 가지 문제 상황이 이어졌습니다.

<br>

**3-2. 카메라 각도에 따른 반사 문제**

  <p align="center">
  <img src="https://postfiles.pstatic.net/MjAyNTAyMDhfMTgw/MDAxNzM5MDA5MTAzMzY4.NYEDZt93HgVW8ybTu0t20JEK5cj6seUhIa9ASzGWo8og.oLNlQQmDb6CMjk__5_l1AiBJ9n2rYtPPGHY6ZlKWfbAg.PNG/%EA%B0%81%EB%8F%84%EB%94%B0%EB%9D%BC%EC%84%9C.png?type=w3840" width="600px">
  </p>

- 문제 상황: 특정 카메라 각도에서 반사가 전혀 보이지 않았습니다.
- 해결 방법: 반사 카메라의 투영 행렬 업데이트 추가했습니다.
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
  - 투영 행렬을 매 프레임 업데이트하여(useFrame) 카메라의 모든 변경사항을 반사에 즉시 반영합니다.
  - 3D 공간의 점들을 2D 화면 좌표로 정확하게 변환합니다.
  - 반사 카메라가 메인 카메라의 설정을 완벽하게 복제합니다.

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
  - 넓은 시야각으로 더 많은 영역을 포착할 수 있습니다.
  - 화면 가장자리에서의 원근 왜곡이 감소합니다.
  - 반사 텍스처에 더 많은 정보가 포함됩니다.
  - 카메라 회전 시 클리핑 현상이 감소됩니다.
  - 텍스처 샘플링 영역 확대로 왜곡이 감소합니다.

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
**5-2. 프레넬 효과** <br>
**5-3. 그림자 처리** <br>
**5-4. 텍스처 적용** <br>

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


### 3. 섬의 컨셉과 상호 작용 이벤트

일정에 대한 우여곡절. 처음에는 섬이 여러 개였던 이야기에 대해 서술. 결국 상호 작용 가능한 섬을 한 개로 축소하게 되었으며 섬의 컨셉과 상호 작용 이벤트를 어떤 식으로 구성하게 되었는지에 대해 서술

<br>

# 🔧 향후 개선 사항

앞으로 다음과 같은 기능을 추가하며 Anchor 프로젝트를 발전시켜나갈 예정입니다.

1. 섬 자동 이동 기능<br><br>
   W,A,S,D를 통한 이동은 게임이 익숙하지 않은 사용자에게는 불친절하게 느껴질 수 있을 거 같습니다. 게임에 처음 진입하면 보트를 섬까지 자동으로 이동할 수 있는 기능을 추가하고자 합니다.<br><br>
2. 튜토리얼 (조작 안내)<br><br>
   현재 조작 방식에 대한 안내가 이루어지지 않아 사용자가 처음 웹에 방문한 사용자에게 혼란을 야기할 수 있을 거 같습니다. 좀 더 친절하게 조작에 대한 안내를 추가할 예정입니다. <br><br>
3. 소품을 제작 및 배치하여 그래픽 환경 보완<br><br>
   나무와 돌처럼 반복적으로 배치할 수 있는 소품을 제작하고 배치할 예정입니다. 사용자가 3D 공간을 보다 자연스럽고 조화롭게 느낄 수 있었으면 합니다.<br><br>
   <br>

# 🗓️ 개발 일정

전체 일정에 대해 서술 <br>
<br>

# 🏝️ 개발 후기

프로젝트 진행 소감 작성 예정
