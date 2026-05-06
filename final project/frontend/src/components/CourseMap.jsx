import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function CourseMap({ courses }) {
  const validCourses = courses.filter(
    (course) => course.latitude !== null && course.longitude !== null
  );

  const center = [35.5951, -82.5515]; 

  return (
    <div style={{ height: "70vh", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={11}
        scrollWheelZoom={true}
        className="h-[500px] w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validCourses.map((course) => (
          <Marker
            key={course.id}
            position={[Number(course.latitude), Number(course.longitude)]}
          >
            <Popup>
              <div>
                <h3 className="font-semibold">{course.name}</h3>
                <p>{course.address}</p>
                <p>Rating: {course.rating ?? "N/A"}</p>
                <p>Par: {course.par ?? "N/A"}</p>
                <p>Distance: {course.distance ?? "N/A"}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
