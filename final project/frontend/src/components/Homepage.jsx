import { useEffect, useState } from "react";
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../api.js";
import CourseMap from "./CourseMap.jsx";
import { Card, Text, Group, Button, Badge } from "@mantine/core";
const emptyForm = {
  name: "",
  address: "",
  latitude: "",
  longitude: "",
  rating: "",
  par: "",
  distance: "",
};

export default function Homepage({ username }) {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingCourse, setEditingCourse] = useState(null);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("list");

  async function loadCourses() {
    try {
      const data = await getCourses();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadCourses();
  }, []);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const coursePayload = {
      name: formData.name,
      address: formData.address,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      rating: formData.rating ? Number(formData.rating) : null,
      par: formData.par ? Number(formData.par) : null,
      distance: formData.distance ? Number(formData.distance) : null,
    };

    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, coursePayload);
      } else {
        await createCourse(coursePayload);
      }

      setFormData(emptyForm);
      setEditingCourse(null);
      setMode("list");
      await loadCourses();
    } catch (err) {
      setError(err.message);
    }
  }

  function startEdit(course) {
    setEditingCourse(course);
    setFormData({
      name: course.name || "",
      address: course.address || "",
      latitude: course.latitude || "",
      longitude: course.longitude || "",
      rating: course.rating || "",
      par: course.par || "",
      distance: course.distance || "",
    });
    setMode("form");
  }

  async function handleDelete(id) {
    try {
      await deleteCourse(id);
      await loadCourses();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">Disc Golf Courses</h1>
      <p className="mb-4">Logged in as {username}</p>
  
      <div className="mb-4 flex gap-2">
        <button onClick={() => setMode("list")} className="border px-2 py-1">
          List
        </button>
  
        <button
          onClick={() => {
            setEditingCourse(null);
            setFormData(emptyForm);
            setMode("form");
          }}
          className="border px-2 py-1"
        >
          Add
        </button>
  
        <button onClick={() => setMode("stats")} className="border px-2 py-1">
          Stats
        </button>
  
        <button onClick={() => setMode("map")} className="border px-2 py-1">
          Map
        </button>
      </div>
  
      {error ? <p className="mb-4 text-red-600">{error}</p> : null}
  
      {mode === "form" ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <h2 className="text-xl font-semibold mb-3">
            {editingCourse ? "Edit Course" : "Add Course"}
          </h2>
  
          <div className="grid gap-2">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Course name"
              className="border p-1"
              required
            />
  
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="border p-1"
              required
            />
  
            <input
              name="latitude"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="Latitude"
              className="border p-1"
              required
            />
  
            <input
              name="longitude"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="Longitude"
              className="border p-1"
              required
            />
  
            <input
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
              className="border p-1"
            />
  
            <input
              name="par"
              value={formData.par}
              onChange={handleChange}
              placeholder="Par"
              className="border p-1"
            />
  
            <input
              name="distance"
              value={formData.distance}
              onChange={handleChange}
              placeholder="Distance"
              className="border p-1"
            />
          </div>
  
          <div className="mt-3 flex gap-2">
            <button type="submit" className="border px-2 py-1">
              {editingCourse ? "Save" : "Create"}
            </button>
  
            <button
              type="button"
              onClick={() => {
                setEditingCourse(null);
                setFormData(emptyForm);
                setMode("list");
              }}
              className="border px-2 py-1"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : null}
  
  {mode === "list" ? (
  <section className="grid gap-4">
    {courses.map((course) => (
      <Card key={course.id} shadow="sm" padding="md" radius="md" withBorder>
        <Group justify="space-between" mb="xs">
          <Text fw={600} size="lg">
            {course.name}
          </Text>

          <Badge variant="light">
            Rating: {course.rating ?? "N/A"}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed" mb="sm">
          {course.address}
        </Text>

        <Text size="sm">Par: {course.par ?? "N/A"}</Text>
        <Text size="sm">Distance: {course.distance ?? "N/A"} ft</Text>

        <Group mt="md">
          <Button
            size="xs"
            variant="default"
            onClick={() => startEdit(course)}
          >
            Edit
          </Button>

          <Button
            size="xs"
            variant="default"
            color="red"
            onClick={() => handleDelete(course.id)}
          >
            Delete
          </Button>
        </Group>
      </Card>
    ))}
  </section>
) : null}
  
      {mode === "stats" ? (
        <section>
          <h2 className="text-xl font-semibold mb-2">Stats</h2>
          <p>Total courses: {courses.length}</p>
          <p>
            Average rating:{" "}
            {courses.length
              ? (
                  courses.reduce(
                    (sum, course) => sum + Number(course.rating || 0),
                    0
                  ) / courses.length
                ).toFixed(1)
              : "N/A"}
          </p>
        </section>
      ) : null}
  
      {mode === "map" ? (
        <section>
          <h2 className="text-xl font-semibold mb-2">Map</h2>
          <CourseMap courses={courses} />
        </section>
      ) : null}
    </main>
  )};