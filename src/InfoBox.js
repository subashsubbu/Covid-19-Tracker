
import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'

function InfoBox({ title, cases, total }) {
    return (
        <Card>
            <CardContent>
                <Typography className='infoBox__title' color='textsecondary'>
                    {title} 
                </Typography>
                <h2 className='infoBox__cases'> {cases} </h2>
                <Typography className='infoBox__total' color='textsecondary'>
                    {total} Total
                </Typography>
            </CardContent>

        </Card>
    )
}

export default InfoBox

