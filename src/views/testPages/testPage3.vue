<template>
    <div>
        <dynamic-table :columns="columns" :handle="handle" :data="data"></dynamic-table>
    </div>

</template>

<script>
import {columns, handle} from "./testPage3Config";

export default {
    name: "testPage3",
    data() {
        return {
            columns,
            handle,
            data: [
                {
                    id: '2313',
                    name: '马超然',
                    age: 22,
                    sex: 1
                },
                {
                    id: '2323',
                    name: '王建',
                    age: 22,
                    sex: 2
                },
                {
                    id: '1253',
                    name: '老板',
                    age: 22,
                    sex: [1,4,5]
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>