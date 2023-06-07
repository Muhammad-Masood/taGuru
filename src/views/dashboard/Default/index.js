import { useEffect, useState } from 'react';
// material-ui
import { Grid } from '@mui/material';
// project imports
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import Chat from "../../../landing/constants/chat";
// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <Chat/>
                 </Grid>
             </Grid>
                 <Grid container spacing={gridSpacing}>
                     <Grid item xs={12} md={8}>
                         <TotalGrowthBarChart isLoading={isLoading} />
                     </Grid>
                 </Grid>
             </Grid>
    );
};

export default Dashboard;
