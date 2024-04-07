<template>
    <ListLayout>
        <SkillChange></SkillChange>
    </ListLayout>
</template>

<script>
import ListLayout from "@/layout/ListLayout.vue";
import SkillChange from "@/components/skill-change.vue";
export default {
    name: "ChangeLog",
    components: {
        ListLayout,
        SkillChange
    }
}
</script>
