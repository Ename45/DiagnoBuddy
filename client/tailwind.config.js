/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                manrope: ['Manrope', 'sans-serif'],
                mansalva: ['Mansalva', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#7E41F5',
                    light: '#CCB2FF',
                },
                mono: {
                    light: '#878787',
                    dark: '#121212',
                },
                gray: {
                    DEFAULT: '#E3E3E3',
                    light: '#F4F4F4',
                },
            },
        },
    },
    plugins: [],
};
