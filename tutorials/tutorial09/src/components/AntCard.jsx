import React from "react";
import { Card } from 'antd';
const { Meta } = Card;


export default function AntdCard({ image_url, name, description }) {
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={
                <img
                    draggable={false}
                    alt="example"
                    src={image_url}
                />
            }
        >
        <Meta title= {name} description={description} />
      </Card>
    )
}