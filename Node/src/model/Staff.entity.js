import { EntitySchema } from 'typeorm';

export default new EntitySchema({
    name: 'Staff',
    tableName: 'staffs',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true,//auto increasement
        },
        fullName: {
            type: 'varchar',
            nullable:false
        },
        gender: {
            type: 'tinyint',
            nullable:false,
        },
        dateOfBirth: {
            type: 'date',
            nullable:false
        },
    },
});
