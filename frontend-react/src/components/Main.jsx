import Button from './Button';

const Main = () => {
    return (
       <>

        <div className='container p-5 my-5'>
            <div className='p-5 text-center rounded my-5 bg-light-dark'>
                <h1 className='text-light bg-light-dark'>Stock Visual Portal</h1>
                <p className='text-light lead bg-light-dark'>Welcome to Stock Visual Portal, your hub for stock market insights and predictions. Using advanced machine learning, we provide real-time data, trend forecasting, and visualized stock patterns to help you make informed investment decisions. Stay ahead of the market with our powerful analytics tools.</p>
                <Button text='Explore Now' RouteLink='/dashboard' design_classes='btn btn-success mx-3 px-5'/>

            </div>

        </div>
       </>
    );
};

export default Main;