import { useEffect, useState } from 'react';
// material-ui
import { Grid } from '@mui/material';
// project imports
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import Chat from "../../../landing/constants/chat";
import br from './br.jpg';
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <img src={br} alt="Total Growth Chart" />
      </div>
    );
};

export default Dashboard;
