import { keyframes } from 'styled-components'; 

const Wobble = keyframes`
5.56% {
    -webkit-transform: translateX(8px);
    transform: translateX(8px);
}
11.11% {
    -webkit-transform: translateX(-6px);
    transform: translateX(-6px);
}
16.67% {
    -webkit-transform: translateX(4px);
    transform: translateX(4px);
}
22.22% {
    -webkit-transform: translateX(-2px);
    transform: translateX(-2px);
} 
27.75% {
    -webkit-transform: translateX(1px);
    transform: translateX(1px);
}
33.33% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
}
100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
}
`; 

export { Wobble }