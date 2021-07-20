const { students, groups } = require('../mock/data');

module.exports.resolvers = {

    Query: {
        students() {
            return students;
        },
        groups() {
            return groups;
        }
    },

    Mutation: {
        createStudent(parent, args) {
            const id = Math.ceil(Math.random() * 100);
            const { fullName, email, age } = args;
            const student = { id, fullName, email, age };
            students.push(student);
            return student;
        },
        createGroup(parent, args) {
            const id = Math.ceil(Math.random() * 100);
            const { name, code } = args;
            const newGroup = { id, name, code, students: [] }
            groups.push(newGroup);
            return true;
        }
    }
};