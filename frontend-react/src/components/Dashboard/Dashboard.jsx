import {useState} from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance from '../../axiosInstance'
const Dashboard = () => {
    const [ticker, setTicker] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const [plot, setPlot] = useState()
    const [ma100, setMa100] = useState()
    const [ma200, setMa200] = useState()
    const [prediction, setPrediciton] = useState()
    const [mse, setMse] = useState()
    const [rmse,setRmse] = useState()
    const [r2,setR2] = useState()

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)
        try{
            const response = await axiosInstance.post('/predict/', {ticker: ticker})
            console.log(response.data)
            const backendRoot = import.meta.env.VITE_BACKEND_ROOT
            const ploturl = `${backendRoot}${response.data.plot_img}`
            const ma100url = `${backendRoot}${response.data.plot_100_dma}`
            const ma200url = `${backendRoot}${response.data.plot_200_dma}`
            const plotpredictionurl = `${backendRoot}${response.data.plot_prediction}`

            // Set Plot 
            setPlot(ploturl)
            setMa100(ma100url)
            setMa200(ma200url)
            setPrediciton(plotpredictionurl)
            setMse(response.data.mse)
            setRmse(response.data.rmse)
            setR2(response.data.r2)

            if(response.data.error){
                setError(response.data.error)
            }
            else{
                setError()
            }
        }
        catch(error){
            console.error("There was an error while making the API request")

        }
        finally{
            setLoading(false)
        }
    } 
    return (
        <div>
        <div className='d-flex justify-content-center align-items-center text-center' style={{height:"100vh"}}>
                  <form className='w-50' onSubmit={handleSubmit}>
                    <strong>{error && <div className='text-danger bolder mb-3'>{error}</div>}</strong>
                        <input type="text" className='form-control' placeholder='Enter Stock Ticker'
                        onChange={(e)=> setTicker(e.target.value)} required
                        />
                       
                        {loading ? (
                          <button type="submit" className="btn btn-info mt-3" disabled>
                            <FontAwesomeIcon icon={faSpinner} spin className="me-2 bg-info" />
                             Getting Your Prediction...
                          </button>
                        ) : (
                            <button type="submit" className='btn btn-info mt-3 text-center'>
                            See Prediction
                          </button>
                        )}
                    </form>
           </div>
           {/* Print Prdiction plot  */}
           {prediction && (
        <div className='prediction'>
            <div className='p-5 m-5 mt-0 pt-0'>
                {plot &&(
                    <img src={plot} style={{maxWidth:"100%"}} />
                    )}

            </div>
            <div className='p-5 m-5 mt-0 pt-0'>
                {ma100 &&(
                    <img src={ma100} style={{maxWidth:"100%"}} />
                    )}

            </div>
            <div className='p-5 m-5 mt-0 pt-0'>
                {ma200 &&(
                    <img src={ma200} style={{maxWidth:"100%"}} />
                    )}

            </div>
            <div className='p-5 m-5 mt-0 pt-0'>
                {prediction &&(
                    <img src={prediction} style={{maxWidth:"100%"}} />
                    )}

            </div>
            <div className='text-light p3 ms-5 ps-5'>
                <h4> Model Evalutation </h4>
                <p>Mean Squared Error (MSE):{mse}</p>
                <p>Root Mean Squared Error (RMSE):{rmse}</p>
                <p>R-Squared (R2):{r2}</p>

            </div>

        </div>
           )}

        </div>
    );
};

export default Dashboard;