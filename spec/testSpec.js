describe("node sql", () => {
    const { addNewVisitor, listVisitors, deleteAllVisitors } = require('../src/file')
    const personnel = {
        name: 'Willy Wonka',
        age: 89,
        date: '21/12/2020',
        time: '12:32',
        assistant: 'Charlie',
        comment: 'Delicious world!'
    }

    it("should save data to database", async (done) => {
        let newVisitor = await addNewVisitor(personnel.name, personnel.age, personnel.date, personnel.time, personnel.assistant, personnel.comment)
        expect(newVisitor[0].visitor_name).toEqual(personnel.name)
        expect(newVisitor[0].visitor_age).toEqual(personnel.age)
        expect(newVisitor[0].date_of_visit).toEqual(personnel.date)
        expect(newVisitor[0].time_of_visit).toEqual(personnel.time)
        expect(newVisitor[0].assistant).toEqual(personnel.assistant)
        expect(newVisitor[0].comment).toEqual(personnel.comment)
        done();
    });

    it("should list all visitors names with id", async (done) => {
        await listVisitors().then(res => {
            const objPersonnel = res.rows
            let id = 0

            expect(objPersonnel[0].name).toEqual(personnel.name)
            expect(objPersonnel[0].age).toEqual(personnel.age)
            expect(objPersonnel[0].date).toEqual(personnel.date)
            expect(objPersonnel[0].time).toEqual(personnel.time)
            expect(objPersonnel[0].assistant).toEqual(personnel.assistant)
            expect(objPersonnel[0].comment).toEqual(personnel.comment)

            id = objPersonnel.id;
        });

        done();
    });

    it("should delete visitors", async done => {
        await deleteAllVisitors().then(res => {
            const objPersonnel = res.rows

            expect(objPersonnel[0].name).toEqual(personnel.name)
            expect(objPersonnel[0].age).toEqual(personnel.age)
            expect(objPersonnel[0].date).toEqual(personnel.date)
            expect(objPersonnel[0].time).toEqual(personnel.time)
            expect(objPersonnel[0].assistant).toEqual(personnel.assistant)
            expect(objPersonnel[0].comment).toEqual(personnel.comment)
        });

        done();
    });

});