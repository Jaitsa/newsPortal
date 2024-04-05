import img from './error.png';

const ErrorPage = () => {
    return (
        <img style={{ display: 'block', width: "600px", height: "600px",objectFit: 'contain', margin: "0 auto"}}  src={img} alt="Error"/>
    )
}

export default ErrorPage;