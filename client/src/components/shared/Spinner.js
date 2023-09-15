
import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin,ConfigProvider, Space } from 'antd';
const antIcon = (
  <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: ' #dc2626',
            borderRadius: 10,
    
            // Alias Token
            
          },
        }}
      >
        <Space
        direction="vertical"
        >
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
    </Space>
  </ConfigProvider>
);
const Spinner = () => <Spin indicator={antIcon} />;
export default Spinner;