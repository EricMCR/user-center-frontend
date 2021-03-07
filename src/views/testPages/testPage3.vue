<template>
    <div>
        <dynamic-table :pageConfig="config"></dynamic-table>
    </div>

</template>

<script>
import {pageConfig} from "./testPage3Config";

export default {
    name: "testPage3",
    data() {
        return {
            config: pageConfig
        }
    }
}
</script>

<style scoped>

</style>