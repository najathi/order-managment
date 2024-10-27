'use client';

import React, { useEffect, useState } from 'react';
import { Table, Button, Drawer, Form, Select, InputNumber, Space, message, Tag, Flex } from 'antd';

import axios from '@/api';
import DynamicBreadcrumb from '@/components/dynamicBreadcrumb';

const { Option } = Select;

interface Product {
  id: number;
  name: string;
  price: number;
  stock_quantity: number;
}

const Page: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [form] = Form.useForm();

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/orders');
      setOrders(data);
    } catch {
      message.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/products');
      setProducts(data);
    } catch {
      message.error('Failed to load products');
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      const payload = {
        items: values.items.map((item: any) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      };

      if (selectedOrder) {
        await axios.put(`/orders/${selectedOrder.id}`, payload);
        message.success('Order updated successfully');
      } else {
        await axios.post('/orders', payload);
        message.success('Order created successfully');
      }

      form.resetFields();
      setDrawerVisible(false);
      fetchOrders();
    } catch {
      message.error('Failed to save order');
    }
  };

  const openDrawer = (order: any = null) => {
    setSelectedOrder(order);
    if (order) {
      form.setFieldsValue({
        items: order.items.map((item: any) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      });
    } else {
      form.resetFields();
    }
    setDrawerVisible(true);
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  const columns = [
    { title: 'Order ID', dataIndex: 'id', key: 'id' },
    { title: 'Total Price', dataIndex: 'total_price', key: 'total_price' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'green' : 'volcano'}>{status}</Tag>
      ),
    },
    {
      title: 'Items',
      dataIndex: 'items',
      key: 'items',
      render: (items: any[]) => (
        <ul>
          {items.map((item) => (
            <li key={item.product_id}>
              {item.product.name} (x{item.quantity})
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: 'Actions',
      render: (order: any) => (
        <Space>
          <Button type="link" onClick={() => openDrawer(order)}>
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Flex
        align='start'
        justify='space-between'
      >
        <DynamicBreadcrumb />
        <Button type="primary" onClick={() => openDrawer()} className="mb-4">
          Create Order
        </Button>
      </Flex>

      <Table dataSource={orders} columns={columns} rowKey="id" loading={loading} />

      <Drawer
        title={selectedOrder ? 'Edit Order' : 'Create Order'}
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        styles={{
          body: { paddingBottom: 80 }
        }}
      >
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.List name="items">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'product_id']}
                      rules={[{ required: true, message: 'Select a product' }]}
                    >
                      <Select placeholder="Select product" style={{ width: 200 }}>
                        {products.map((product) => (
                          <Option key={product.id} value={product.id}>
                            {product.name} (Stock: {product.stock_quantity})
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'quantity']}
                      rules={[{ required: true, message: 'Enter quantity' }]}
                    >
                      <InputNumber min={1} placeholder="Quantity" />
                    </Form.Item>
                    <Button onClick={() => remove(name)} danger>
                      Remove
                    </Button>
                  </Space>
                ))}
                <Button type="dashed" onClick={() => add()} block>
                  Add Product
                </Button>
              </>
            )}
          </Form.List>

          <div className="flex justify-end space-x-2 mt-4">
            <Button onClick={() => setDrawerVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              {selectedOrder ? 'Update' : 'Create'}
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default Page;