import React from 'react'
import { Card } from 'semantic-ui-react';
import moment from 'moment';

export default function Forecast({ forecast }) {
    return (
        <div style={{marginTop:20,opacity:0.3}}>
            <Card.Group itemsPerRow={4} >
                {forecast.map((data) => {
                    return (
                        <Card className='forecast-card'>
                            <Card.Content >
                            <Card.Header className="forecast-date">
                                    Date: {moment.unix(data.dt).format('LL')}
                                </Card.Header>
                                <Card.Header className='forecast-header'>
                                    Temperature:{Math.round((data.temp.max+data.temp.min)/2)}˚C
                                    </Card.Header>
                                <Card.Meta className='forecast-header'>
                                    Humidity:{data.humidity}%
                                    </Card.Meta>
                                <Card.Description className='temp-desc'>
                                    Description:{data.weather[0].description}
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>



        </div>
    )
}
