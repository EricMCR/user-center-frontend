<template>
    <div>
        <dynamic-table :pageConfig="config"></dynamic-table>
    </div>
</template>

<script>
import {pageConfig} from "./adminManagementConfig";

export default {
    name: "adminManagement",
    data() {
        return {
            config: pageConfig
        }
    }
}
</script>

<style scoped>

</style>