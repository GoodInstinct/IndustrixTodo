import { useEffect, useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import "../styles/todo.css";

import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  Tag,
  Card,
} from "antd";

import {
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} from "../services/todoService";

export default function TodosPage() {
  const {
    todos,
    categories,
    pagination,
    filters,
    fetchTodos,
    fetchCategories,
    setFilters,
  } = useTodoContext();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  // Load todos + categories on mount
  useEffect(() => {
    fetchTodos(1);
    fetchCategories();
  }, []);

  // ---------- Modal ----------
  const openAddModal = () => {
    setEditing(null);
    form.resetFields();
    setOpen(true);
  };

  const openEditModal = (record) => {
    setEditing(record);

    form.setFieldsValue({
      ...record,
      category_id: record.category?.id || null,
    });

    setOpen(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();

    if (editing) {
      await updateTodo(editing.id, values);
    } else {
      await createTodo(values);
    }

    setOpen(false);
    fetchTodos(pagination.current_page);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    fetchTodos(pagination.current_page);
  };

  const handleToggle = async (id) => {
    await toggleTodo(id);
    fetchTodos(pagination.current_page);
  };

  // ---------- Table Columns ----------
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      render: (text, record) => (
        <>
          {text}
          {record.completed && <Tag color="green" style={{ marginLeft: 8 }}>Completed</Tag>}
        </>
      ),
    },

    {
      title: "Category",
      dataIndex: ["category", "name"],
      render: (_, record) =>
        record.category ? (
          <Tag color={record.category.color}>{record.category.name}</Tag>
        ) : (
          "-"
        ),
    },

    {
      title: "Priority",
      dataIndex: "priority",
      render: (priority) => {
        const colors = {
          high: "red",
          medium: "orange",
          low: "green",
        };
        return <Tag color={colors[priority]}>{priority}</Tag>;
      },
    },

    {
  title: "Actions",
  width: 200, // <<< FIX LEBAR TETAP
  render: (_, record) => (
    <div style={{ 
      display: "flex", 
      gap: "10px",
      alignItems: "center"
    }}>
      <Button type="link" style={{ width: 60 }} onClick={() => openEditModal(record)}>
        Edit
      </Button>

      <Button type="link" style={{ width: 80 }} onClick={() => handleToggle(record.id)}>
        {record.completed ? "Undo" : "Complete"}
      </Button>

      <Popconfirm
        title="Delete todo?"
        onConfirm={() => handleDelete(record.id)}
      >
        <Button danger type="link" style={{ width: 60 }}>
          Delete
        </Button>
      </Popconfirm>
    </div>
  ),
},

  ];

  return (
    <>
      <h1 className="page-header">Todo List</h1>

      <Card className="card-wrapper">

        {/* FILTER BAR */}
        <div className="filter-bar">
          <Select
            placeholder="Status"
            allowClear
            style={{ width: 150 }}
            value={filters.status}
            onChange={(value) => {
              setFilters({ ...filters, status: value });
              fetchTodos(1, { status: value });
            }}
            options={[
              { value: "completed", label: "Completed" },
              { value: "incomplete", label: "Incomplete" },
            ]}
          />

          <Select
            placeholder="Category"
            allowClear
            style={{ width: 150 }}
            value={filters.category}
            onChange={(value) => {
              setFilters({ ...filters, category: value });
              fetchTodos(1, { category: value });
            }}
          >
            {categories.map((cat) => (
              <Select.Option key={cat.id} value={cat.id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Priority"
            allowClear
            style={{ width: 150 }}
            value={filters.priority}
            onChange={(value) => {
              setFilters({ ...filters, priority: value });
              fetchTodos(1, { priority: value });
            }}
            options={[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
          />
        </div>

        {/* SEARCH */}
        <Input.Search
          placeholder="Search todos..."
          allowClear
          value={filters.search}
          onChange={(e) => {
            setFilters({ ...filters, search: e.target.value });
  }}
          onSearch={(value) => {
          fetchTodos(1, { search: value });
  }}
  style={{ width: 300, marginBottom: 20 }}
/>


        {/* ADD BUTTON */}
        <Button
          type="primary"
          onClick={openAddModal}
          style={{ marginBottom: 20 }}
        >
          Add Todo
        </Button>

        {/* TABLE */}
        <Table
          rowKey="id"
          columns={columns}
          dataSource={todos}
          pagination={{
            current: pagination.current_page,
            pageSize: pagination.per_page,
            total: pagination.total,
            onChange: (page) => fetchTodos(page),
            position: ["bottomCenter"],
          }}
        />
      </Card>

      {/* MODAL */}
      <Modal
        title={editing ? "Edit Todo" : "Add Todo"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
      >
        <Form layout="vertical" form={form}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item name="priority" label="Priority">
            <Select>
              <Select.Option value="high">high</Select.Option>
              <Select.Option value="medium">medium</Select.Option>
              <Select.Option value="low">low</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="category_id" label="Category">
            <Select allowClear>
              {categories.map((cat) => (
                <Select.Option key={cat.id} value={cat.id}>
                  {cat.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
