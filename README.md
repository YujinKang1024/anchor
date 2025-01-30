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
- [🔧 Future Enhancements](#-future-enhancements)
- [🏝️ Review](#-review)

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
    <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MTlfMTY4/MDAxNzI0MDUwNzAwODU4.No495pc6-tRIq8Q0VO4_vI5kJjwUNllkY-FOmrmqPXcg.wjdbDx-ID0FE9p090Slyy_1VBq75cEOfuPf1n7gcprwg.GIF/%EC%9D%B4%EB%8F%99.gif?type=w3840">
    <p align="center">키보드 조작을 통한 보트의 이동</p>
    </details>

### 시스템 상태
시스템은 크게 두 가지 모드로 나눌 수 있습니다.

#### 1. 보트 조작 모드
- 사용자가 보트를 조작할 수 있는 상태입니다.
- About 버튼을 통해 개발자에 대한 소개를 접할 수 있습니다.
    <details>
    <summary> 미리 보기 </summary>
    <br>
    <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MTlfOTUg/MDAxNzI0MDUxMTIyODQy.diDGtuFvHb7Xv074w7EYsKy9TuN9hV5TGsPE0509u68g.E2rKq6r8kSl2GRgoWAV4zSAgoxGpSy6OQSNpAK_yF1gg.GIF/%EC%96%B4%EB%B0%94%EC%9B%83.gif?type=w3840">
    <p align="center">About 버튼 상호작용</p>
    </details>

#### 2. 섬 진입 모드
- 섬에 다가가면 등장하는 Enter Island 버튼을 통해 섬에 진입한 상태입니다.
    <details>
    <summary> 미리 보기 </summary>
    <br>
    <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MTlfMTgw/MDAxNzI0MDUxOTk0NDQ1.fMkOw1hUTMjjkC1QmiQBu_5j1Vnl-Ff9IlzQK34Pt4gg.ooK8bLi-0dHbwcAfHZlW47SxJK6Z3gkiPdQ9m4VRnPQg.GIF/%EC%84%AC%EC%A7%84%EC%9E%85.gif?type=w3840">
    <p align="center">Enter Island 버튼으로 섬에 진입</p>
    </details>

- PORTFOLIO 버튼을 통해 개발자 포트폴리오에 대한 정보를 접할 수 있습니다.
    <details>
    <summary> 미리 보기 </summary>
    <br>
    <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MTlfODgg/MDAxNzI0MDUyMjUwODAx.Frt5O-ZYkCZch-yuO54dJlL_HgYcZBoEoVdjh8CLaE0g.5hvy_YLAA9U_wLb2NYOY73mSMAzD6LrZUbvlZTrTKCIg.GIF/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4.gif?type=w3840">
    <p align="center">Enter Island 버튼으로 섬에 진입</p>
    </details>

- 버튼 오브젝트를 클릭하면 몬스터와의 전투가 벌어집니다.
    <details>
    <summary> 미리 보기 </summary>
    <br>
    <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MTlfMTY4/MDAxNzI0MDUwNzAwODU4.No495pc6-tRIq8Q0VO4_vI5kJjwUNllkY-FOmrmqPXcg.wjdbDx-ID0FE9p090Slyy_1VBq75cEOfuPf1n7gcprwg.GIF/%EC%9D%B4%EB%8F%99.gif?type=w3840">
    <p align="center">Enter Island 버튼으로 섬에 진입</p>
    </details>

- 자판기 오브젝트를 클릭해 음료수를 뽑을 수 있습니다.
    <details>
    <summary> 미리 보기 </summary>
    <br>
    <img width="600" src="https://postfiles.pstatic.net/MjAyNDA4MTlfMTY4/MDAxNzI0MDUwNzAwODU4.No495pc6-tRIq8Q0VO4_vI5kJjwUNllkY-FOmrmqPXcg.wjdbDx-ID0FE9p090Slyy_1VBq75cEOfuPf1n7gcprwg.GIF/%EC%9D%B4%EB%8F%99.gif?type=w3840">
    <p align="center">Enter Island 버튼으로 섬에 진입</p>
    </details>
<br>

# ⛵ 프로젝트 기획

### 💭 기획 동기

게임 개발, 특히 3D 배경 그래픽을 전공하며 쌓은 경험을 토대로, 웹 개발이라는 새로운 분야에 도전하게 되었습니다. 단순한 게임 콘텐츠를 넘어 실용적인 웹 서비스에 관심을 가지게 되었으나, 3D 그래픽에 대한 열정은 여전히 제 관심의 중심에 있었습니다.

3차원 공간이 가진 생동감은 사용자의 몰입도를 높이는 강력한 도구라고 생각합니다. 이에 평면적인 웹사이트를 넘어, 사용자의 기억에 깊이 남을 수 있는 역동적인 3D 웹 경험을 설계하고자 했습니다.

3D 그래픽과 웹 개발을 접목하는 이번 도전은 제게 특별한 의미를 가집니다. 이는 단순한 기술 스택의 확장을 넘어, 제가 추구하는 개발자로서의 정체성을 표현하는 기회이기도 했습니다. 그렇게 첫 개인 프로젝트로 '3D 요소를 역동적으로 표현한 포트폴리오 웹사이트'를 기획하게 되었습니다.
### 💭 기획 과정
#### 1. 컨셉 결정
자기표현의 수단으로 가장 적절한 컨셉을 고민하는 과정에서, 주변인들의 의견이 큰 도움이 되었습니다. 끊임없이 변화하는 기술의 바다 속에서 꾸준히 성장해나가는 모습이 항해하는 배와 닮았다는 피드백을 받았습니다. '바다' 구현의 기술적 난이도에 대한 우려가 있었으나, 도전 가치가 있다고 판단했습니다.

이러한 고민 끝에 인생을 바다에 비유하여, 항해 중 닻을 내린 정박지를 소개하는 컨셉으로 'Anchor'라는 프로젝트명을 확정하였습니다.

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
2. **스타일 캡슐화**
    - 컴포넌트별로 스타일을 격리하여 관리할 수 있습니다.
    - CSS 클래스 이름 충돌 걱정 없이 스타일을 작성할 수 있습니다.

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

1. **도전 과제**
<br>프로젝트의 주요 배경인 바다를 구현하는 것은 큰 도전 과제였습니다. 사실적인 바다 표현을 위해 다음과 같은 요소들이 필요했습니다:

    - 물의 반사와 투명도
    - 실시간으로 움직이는 파도
    - 물결에 따른 그림자 처리
    - 수면 아래의 깊이감 표현
    - 물의 굴절과 프레넬 효과
  
    <p align="center">
      <img width=400 alt="anchor" src="https://postfiles.pstatic.net/MjAyNTAxMjlfNTUg/MDAxNzM4MTM0OTk2Mzk5.oQHAyB0MGqoZhQSt6lvvGz2aKajLTdH1UEP4IMIlL3sg.8XLEi34YSP4Ax5HJIoCeXjHUnOeBn9m5MRfmOqBieuog.GIF/%EB%B0%94%EB%8B%A4_(1).gif?type=w3840" />
      <br> 위 특징을 반영해 구현한 바다의 모습
    </p>

<br>

2. **구현 방식**
<br></br>
2-1. **셰이더를 활용한 물 표면 구현**
<br><p align="center">
  <img width=400 alt="anchor" src="https://postfiles.pstatic.net/MjAyNDA4MDhfMTQ1/MDAxNzIzMDk4OTc4MDA2.BnZhs1bamVmYOSIJEmKffTCjGI5ZUtBnSAVvlHXS9Hwg.dcjLxztuv1FpCb-Mh9yfBBE9xUI4n3gaShGX3onN3LEg.PNG/SE-b6a5150e-0d14-4386-9e9a-46a284e6fe3b.png?type=w966" /></p>
  바다의 메쉬는 단순한 평면으로 이루어져 있습니다. 이러한 평면을 바다처럼 보이게 하는 것은 '재질'입니다. Three.js에서는 머테리얼(Material)을 활용하여 모델링에 입혀질 재질에 대해 결정할 수 있습니다.<br><br>
머테리얼에도 여러 종류가 있지만 물을 구현하기 위해서는 셰이더 머테리얼(Shader Material)을 활용해야겠다고 판단했습니다. 물의 특성 상 실시간으로, 동적으로 모델링의 모양과 입혀질 색에 대한 변형이 이루어져야하기 때문입니다. 이렇듯 그래픽에 대한 동적인 변형은 셰이더를 통해 구현할 수 있습니다. <br><br>
셰이더가 무엇이기에 이러한 그래픽의 동적 변형을 가능하게 하는 걸까요?
    >셰이더(Shader)란 무엇일까?
    <br>

    셰이더는 간단히 말해 **화면에 출력할 픽셀의 위치와 색상을 계산하는 함수**입니다. 셰이더는 그래픽 처리장치(GPU)에서 처리되며, 주로 그래픽에 대한 조작이 실시간으로 이루어져야 할 때 활용합니다.

    Three.js에서의 셰이더 머테리얼을 활용하면 프로그래머가 작성한 셰이더 코드를 프로젝트에 적용할 수 있습니다. 여기서 또 한가지 알아야 할 것은, 셰이더 머테리얼을 구성하는 요소로 **버텍스 셰이더(Vertex Shader)** 와 **프래그먼트 셰이더(Fragment Shader)** 두 가지가 있다는 것입니다.

    <p align="center">
    <br>
    <img src="https://postfiles.pstatic.net/MjAyNDA4MDdfMTE2/MDAxNzIzMDIzNDI0MzI2.sUnzEpyxaasxWLgL-OJbLTio6cWbajFnuZH-hdYKBfsg.zLnz_ms3UEbZphqFWtjJCA6lyKpAnozxmcIGsw2Z-u0g.PNG/c2_pipeline.png?type=w966" width="600px">
    <br>
    </p>

    3D 모델링은 수 많은 정점(Vertex)으로 이루어져 있습니다. Vertex Shader는 이러한 정점에 대한 변형 동작을 수행하며, 각 정점의 위치가 화면 상의 어느 위치에 그려질 것인지에 대한 값을 출력합니다. 버텍스 셰이더가 출력한 값을 기반으로 실제 화면의 픽셀에 그려질 최종적인 모습을 결정하는 것이 프래그먼트 셰이더입니다.

    버텍스 셰이더는 정점 단위로, 프래그먼트 셰이더는 픽셀 단위로 연산을 수행한다고 정리해볼 수 있겠습니다.

    구현한 바다 셰이더에서, 버텍스 셰이더와 프래그먼트 셰이더는 각각 다음의 역할을 수행합니다.

    <br>

    (1) **버텍스 셰이더** : 파도의 움직임 구현<br>
    - 시간에 따른 파도의 높낮이 계산<br>
    - 수면의 움직임을 위한 정점 위치 조정<br>

  (2) **프래그먼트 셰이더**
    - 물의 색상과 투명도 처리
    - 프레넬 효과를 통한 반사율 조정
    - 깊이에 따른 색상 변화
#### 1-3. 물의 반사를 어떻게 구현해야 할까?

물에 반사되어 맺히는 상은 실제 보이는 화면을 거꾸로 뒤집어 놓은 형태여야 합니다. 이를 구현하기 위해 다음과 같은 방법을 사용했습니다.

**(1) 반사 카메라 설정**

- 메인 카메라를 복제하여 반사 카메라를 생성했습니다.
- 반사 카메라의 위치를 물 표면을 기준으로 메인 카메라의 위치를 상하 반전시켜 설정했습니다.

**(2) 반사 텍스처 생성**

- WebGLRenderTarget을 사용하여 반사 이미지를 렌더링할 대상을 생성했습니다.
- 매 프레임마다 반사 카메라로 장면을 렌더링하여 반사 텍스처를 생성했습니다.

**(3) 셰이더 구현**

- 버텍스 셰이더에서는 기본적인 위치 계산과 텍스처가 입혀질 좌표를 조정합니다.
- 프래그먼트 셰이더에서는 반사 텍스처와 기본 물 색상을 혼합하여 최종적으로 화면에 그려질 모습을 결정했습니다.

<br>
위 방법에 맞추어 물을 처음 구현한 모습은 다음과 같습니다.

<p align="center">
<img src="https://postfiles.pstatic.net/MjAyNDA4MDhfMTIz/MDAxNzIzMTA0MTE0MzQ3.7dHw7TxiMrckwIllQyX2X69XbU-mnxv8knwv1WQm0CEg.dcGEIWhn2ouDQiAdRZzCIb9wN6cRQkzsL1DjzMVo6_Ag.PNG/%EC%9D%8C.png?type=w3840" width="600px">
<br>왜 이렇게 됐을까요?
</p>
물 모델링의 높이를 고려하지 않았으며 물 표면에 대한 반사가 아닌 전체 씬에 대한 반사가 이루어지게 코드를 작성하였기 때문. 물 표면에 대해서만 반사가 이루어지게 구현해야 한다. 그렇게 코드를 수정하다보니 또 다른 문제에 봉착했다. <br><br>

<p align="center">
<img src="https://postfiles.pstatic.net/MjAyNDA4MDhfNTYg/MDAxNzIzMTA0MzQ1OTgx.POYIE-0vmIDpga2IgTOo_0wBGH8_DmQmDo6xbQLs4Wcg.4YHafN1f6pe1MjfNbMYxddjsJU4HKPjunIyVW323J4cg.PNG/%EC%9D%B4%EA%B2%8C%EB%AD%90%EC%95%BC.png?type=w966" width="600px">
<br>반사가 제대로 되지 않는 데다가 처음 보는 경고 메시지가 잔뜩 발생했습니다.
<br>
</p>
GL_INVALID_OPERATION 경고:
이 경고는 텍스처를 렌더링 대상으로 사용하면서 동시에 셰이더에서 읽으려고 할 때 발생합니다. 이를 해결하기 위해 더블 버퍼링 기법을 사용할 수 있습니다.
더블 버퍼링 기법이란 무엇이고, 왜 이것으로 문제를 해결할 수 있는지에 대한 서술을 적을 예정입니다. <br>

#### 1-4. 텍스처 적용시켜 바다답게 만들어 보자.

단순히 매끈한 평면이어서는 바다의 느낌이 잘 살지 않습니다. 얼음같이 느껴지기도 하고요. 물결을 표현하기 위해 텍스처를 적용해야 합니다. 텍스처의 종류, 특히 노말맵에 대해 간략히 설명하고 적용한 텍스처에 대해 이미지 첨부
<br>

#### 1-5. 물결에 따른 바다의 움직임 구현하자.

노말맵을 기준으로 한 애니메이션 구현하여 물결이 움직이는 것과 같은 효과를 냈다. 버텍스 셰이더를 통해 시간에 따라 크게 물결이 치는 것처럼 파도를 여러 개 구현. 두 방식의 애니메이션을 조합하여 물결의 움직임과 파도를 만들었다. 그 후에 보트 역시 시간에 따라 상하로 움직이게 구현하여 자연스러운 바다의 모습과 보트를 만들었다.

### 2. 보트를 어떤 방식으로 이동시킬까?

처음에는 정해진 경로에 따라 스크롤 이벤트로 보트를 이동시키는 방식을 구상하고 기획
웹에서 가장 보편적인 방식이라 생각했다. 누구든 자연스럽게 적응할 수 있고, 정해진 정보를 보여주기에도 적절하다고 생각함

#### 2-1. 스크롤에 기반한 보트 이동 이벤트 기획과 구현

가상의 스크롤을 만드는데 겪은 어려움에 대해 서술
3D 공간, 정확히는 보트가 이동 가능한 거리만큼이 콘텐츠이자 스크롤의 길이가 되어야 했다. 경로가 확실히 정해져 있어야 했기 때문에 경로에 대한 line 메쉬를 따로 제작해 가져왔다. 이 방식의 문제점은 확장성이 몹시 떨어진다는 점이었는데 단점을 감안하고 개발 진행

#### 2-2. 스크롤의 순환과 보트의 위치 이동을 자연스럽게 구현하기

스크롤이 바닥에 닿으면 다시 위로 올라와야했다. 보트는 원형 경로로 이동했는데, 이 말은 보트가 한 바퀴를 죽 돌고 스크롤이 바닥에 닿고 처음으로 돌아오면 보트가 초기의 위치로 돌아온다는 것을 뜻함. 스크롤이 바닥에 닿아 다시 위로 올라갈 때 보트의 자연스러운 움직임을 표현하기 위해 requestAnimationFrame 으로 스크롤이 바닥에 닿았을 때의 애니메이션 구현

#### 2-3. 보트 이동에 스크롤 이벤트는 어울리지 않았다.

스크롤 이벤트는 지속적으로 일어나기 쉽지 않다. 키보드 이벤트는 키를 누른 상태를 쭉 유지하면 키 이벤트가 지속적으로 일어남. 그러나 스크롤은 스크롤을 내리고, 필연적으로 멈추는 타이밍이 생김. 스크롤을 무한하게 내리는 것은 일반적인 마우스로는 피로감이 있는 일이다.<br>
평범하게 스크롤을 내렸을 때, 보트가 짧게 움직이고 멈추길 반복하는 걸 확인할 수 있었다. 그리고 이 모습이 굉장히 어색해 보였다. 부끄럽게도 나는 무한 스크롤 기능이 있는 마우스 장비를 쓰고 있어서 이 점에 대한 파악이 늦어졌다...<br>
이 시점에서 기획을 다시 돌아봤다. 넓은 바다에 대한 공간이 주어진 가운데 플레이어가 정해진 경로대로만 이동할 수 있게 하는 게 과연 좋을까? 자유롭게 공간을 이동하고 탐험할 기회를 괜히 제한하는 게 아닐까? 생각하게 됨. 기획의 중요성을 깨달음. 이 프로젝트를 기획했을 때 시간이 굉장히 촉박할 것이라 미리 예견했고, 때문에 기획 단계를 비교적 빠르게 넘어가기도 했음. <br>
결국, 프로젝트와 어울리는 방향성을 재차 고민하며 보트 이동이 키보드 이벤트로 일어나게 수정함

#### 2-4. 키보드 이벤트로 변경하여 구현

키보드 이벤트 구현에 대한 이야기. 보트의 좌표를 추적하여 특정 좌표에 다다르면 섬 진입 이벤트가 가능하게 하는 등, 스크롤 이벤트와는 다른 방식으로 요구 사항을 충족해나갈 수 있었다.
<br>

### 3. 섬의 컨셉과 상호 작용 이벤트

일정에 대한 우여곡절. 처음에는 섬이 여러 개였던 이야기에 대해 서술. 결국 상호 작용 가능한 섬을 한 개로 축소하게 되었으며 섬의 컨셉과 상호 작용 이벤트를 어떤 식으로 구성하게 되었는지에 대해 서술 <br>

# 🔧 Future Enhancements

앞으로 다음과 같은 기능을 추가하며 Anchor 프로젝트를 발전시켜나갈 예정입니다.

1. 섬 자동 이동 기능<br><br>
   W,A,S,D를 통한 이동은 게임이 익숙하지 않은 사용자에게는 불친절하게 느껴질 수 있을 거 같습니다. 게임에 처음 진입하면 보트를 섬까지 자동으로 이동할 수 있는 기능을 추가하고자 합니다.<br><br>
2. 튜토리얼 (조작 안내)<br><br>
   현재 조작 방식에 대한 안내가 이루어지지 않아 사용자가 처음 웹에 방문한 사용자에게 혼란을 야기할 수 있을 거 같습니다. 좀 더 친절하게 조작에 대한 안내를 추가할 예정입니다. <br><br>
3. 소품을 제작 및 배치하여 그래픽 환경 보완<br><br>
   나무와 돌처럼 반복적으로 배치할 수 있는 소품을 제작하고 배치할 예정입니다. 사용자가 3D 공간을 보다 자연스럽고 조화롭게 느낄 수 있었으면 합니다.<br><br>
   <br>

# 🗓️ Schedule

전체 일정에 대해 서술 <br>
<br>

# 🏝️ Review

프로젝트 진행 소감 작성 예정
