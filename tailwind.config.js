export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 기본 색상
        white: '#ffffff',
        black: '#000000',

        // 브랜드 및 시맨틱 색상
        primary: '#112856',
        'semantic-green': '#2f5539',
        'semantic-red': '#d12f37',
        'semantic-blue': '#23507a',

        // 라이트 그레이 계열
        'lightgrey-1': '#f8f8f8',
        'lightgrey-2': '#f3efef',
        'lightgrey-3': '#e5e7eb',
        'lightgrey-4': '#e6e5e5',

        // 그레이 계열
        'grey-1': '#d8d8d8',
        'grey-2': '#bbbbbb',
        'grey-3': '#808080',
        'grey-4': '#5f5f5f',

        // 다크 그레이 계열
        'darkgrey-1': '#43464e',
        'darkgrey-2': '#1d1f22',
        'darkgrey-3': '#121212',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        diptyque: ['Diptyque', 'serif'],
      },
      fontSize: {
        // PC 폰트 크기
        display1: '120px',
        display2: '80px',
        display3: '60px',
        heading1: '36px',
        heading2: '28px',
        heading3: '16px',
        body1: '18px',
        body2: '16px',
        body3: '14px',
        body4: '12px',

        // 모바일 폰트 크기
        'display1-m': '44px',
        'display2-m': '30px',
        'heading1-m': '28px',
        'heading2-m': '20px',
        'heading3-m': '16px',
        'heading4-m': '14px',
        'body1-m': '16px',
        'body2-m': '14px',
        'body3-m': '12px',
      },
      screens: {
        desktop: { min: '1024px' },
        tablet: { max: '1023px' },
        mobile: { max: '767px' },
      },
      spacing: {
        // 헤더높이
        'header-h': '128px', // pc
        'header-h-m': '76px', // 태블릿, 모바일

        // 제목-내용 사이 간격
        'cont-gap': '40px',

        // 섹션별 간격
        'sec-gap-pc': '200px',
        'sec-gap-t': '150px',
        'sec-gap-m': '100px',
      },
    },
  },
  plugins: [],
};
