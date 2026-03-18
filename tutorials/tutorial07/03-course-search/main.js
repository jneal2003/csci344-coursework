let searchTerm = "";
let openOnly = false;

function isClassFull(course) {
    // Return true if course.Classification.Open === false
    return course.Classification.Open === false;
}

function doesTermMatch(course) {
    // If searchTerm is empty, return true (show all courses)
    // Convert searchTerm to lowercase
    // Check if searchTerm appears in (all converted to lowercase):
    //   - course.Code
    //   - course.Title
    //   - course.CRN (convert to string first)
    //   - course.Instructors[].Name (use map to get all names, then join)
    // Use includes() for case-insensitive matching
    // Return true if searchTerm matches any of these fields
    if (searchTerm === "") return true;

    const term = searchTerm.toLowerCase();

    const code = course.Code.toLowerCase();
    const title = course.Title.toLowerCase();
    const crn = String(course.CRN);
    const instructors = course.Instructors
        .map(teach => teach.Name.toLowerCase())
        .join(" ");

    return (
        code.includes(term) ||
        title.includes(term) ||
        crn.includes(term) ||
        instructors.includes(term)
    );
}

function dataToHTML(course) {
    // should return a formatted HTML card with the relevant course info
    // (using template literals). 
    const seats = course.EnrollmentMax - course.EnrollmentCurrent;
    const isOpen = course.Classification.Open;

    const statusOfClass = isOpen ? "open" : "closed";
    const icon = isOpen ? "fa-circle-check" : "fa-circle-xmark";

    const status = isOpen
        ? `Open &bull; ${course.CRN} &bull; Seats Available: ${seats}`
        : `Closed &bull; ${course.CRN} &bull; Number on Waitlist: ${course.WaitlistAvailable}`;

    const instructors = course.Instructors
        .map(teacher => teacher.Name)
        .join(", ");

    return `
        <section class="course-card">
            <h2>${course.Code}: ${course.Title}</h2>
            <p class="status ${statusOfClass}">
                <i class="fa-solid ${icon}"></i>
                ${status}
            </p>
            <p>
                ${course.Days || "TBA"} &bull; ${course.Location.FullLocation || "TBA"} &bull; ${course.Hours} credit hour(s)
            </p>
            <p>
                <strong>${instructors}</strong>
            </p>
        </section>
    `;
}

function showMatchingCourses() {
    // 1. Get the .courses container element
    // 2. Clear it
    // 3. Start with courseList (from course-data.js)
    // 4. Apply the filters and store the matched courses in a variable
    // 5. If no courses match, display "No courses match your search." and return
    // 6. Output each course to the .courses container (forEach + insertAdjacentHTML)
    const courseContainer = document.querySelector(".courses");
    courseContainer.innerHTML = "";

    let matchedCourses = courseList
        .filter(course => doesTermMatch(course))
        .filter(course => !openOnly || !isClassFull(course));

    if (matchedCourses.length === 0) {
        courseContainer.innerHTML = "<p>No courses match your search.</p>";
        return;
    }

    matchedCourses.forEach(course => {
        courseContainer.insertAdjacentHTML("beforeend", dataToHTML(course));
    });
}

function filterCourses() {
    // Update global variables (searchTerm and openOnly) by
    // reaching into the DOM and retrieving their values
    // Invoke the showMatchingCourses() function
    searchTerm = document.querySelector("#search_term").value;
    openOnly = document.querySelector("#is_open").checked;
    showMatchingCourses();
}

showMatchingCourses();