import React from 'react';
import Typography from '@material-ui/core/Typography';
import BasicTable from '../componente/userTabel';

export default function Users(){
    return(
        <div>
            <Typography>
                Tabel cu Useri
            </Typography>
            <BasicTable></BasicTable>
        </div>
    )
}