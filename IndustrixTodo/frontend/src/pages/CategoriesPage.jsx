import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tag,
  Popconfirm,
  Card,
} from "antd";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  // Fetch categories
  const fetchData = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const openEditModal = (record) => {
    setEditing(record);
    form.setFieldsValue(record);
    setOpen(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();

    if (editing) {
      await updateCategory(editing.id, values);
    } else {
      await createCategory(values);
    }

    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchData();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Color",
      dataIndex: "color",
      render: (color) => <Tag color={color}>{color}</Tag>,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Delete category?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button danger type="link">Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      {/* Header sama seperti Todos */}
      <h1 className="page-header">Categories</h1>

      {/* WRAPPER => yang missing di punya kamu */}
      <Card className="card-wrapper">

        <Button
          type="primary"
          onClick={openAddModal}
          style={{ marginBottom: 20 }}
        >
          Add Category
        </Button>

        <Table rowKey="id" columns={columns} dataSource={categories} />
      </Card>

      {/* MODAL */}
      <Modal
        title={editing ? "Edit Category" : "Add Category"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Category name required" }]}
          >
            <Input placeholder="Category name" />
          </Form.Item>

          <Form.Item
            name="color"
            label="Color"
            rules={[{ required: true, message: "Color is required" }]}
          >
            <Input placeholder="#FF0000" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
