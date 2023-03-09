export const rowTemplate = (tableData = html`${tableData.map(
    (student) => html`
        <tr id=${student._id}>
            <td>${student.firstName} ${student.lastName}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
        </tr>
    `
)}`);
