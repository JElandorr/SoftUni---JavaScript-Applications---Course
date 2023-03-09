function onClick() {
    render(rowCard, table);
    const workTableData = [];
    tableData.forEach((student) => {
        workTableData.push(student);
    });

    const inputField = document.getElementById("searchField");
    const inputData = inputField.value;

    let result = workTableData.map((student) => {
        if (
            student.firstName.includes(inputData) ||
            student.lastName.includes(inputData) ||
            student.course.includes(inputData)
        ) {
            return { ...student, selected: true };
        }
        return student;
    });

    console.log(result);

    const modifiedCard = html`${result.map(
        (student) => html`
            <tr
                id=${student._id}
                class=${classMap({
                    select: student.select,
                })}
            >
                <td>${student.firstName} ${student.lastName}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
            </tr>
        `
    )}`;

    render(modifiedCard, table);
}
