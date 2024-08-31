import {useEffect} from 'react';
import axiosInstance from '../../axiosInstance'
const Dashboard = () => {
    useEffect(() =>{
        const fetchProtectd = async () =>{
            try{
                const res = await axiosInstance.get('/protected-view/')
                console.log(res)
            }catch(error){
                console.log(error)
            }
        }
        fetchProtectd()
    },[])
    return (
        <div>
            <h1 className='text-light container'>Dashboard</h1>
        </div>
    );
};

export default Dashboard;