<template>
  <div style="position: fixed;  bottom: 0;  left: 0;  right: 0; z-index:100;">
    <v-tabs
      v-model="tab"
      background-color="#3396F4"
      color="cyan"
      :icons-and-text="icons"
      class="elevation-2"
      :centered='true'
      :dark='true'
      height='60'
      show-arrows
      grow
    >
      <v-tab v-for="t in tabs" :key=t.id :to=t.route exact active-class="default-class your-class">
        <v-icon>{{ t.icon }}</v-icon>
        <div v-if="tab === t.route">{{ t.title }}</div>
      </v-tab>
    </v-tabs>
  </div>
</template>

<script>

export default {
  name: "TabBar",
  data() {
    return {
      title:'뉴스피드',
      tab: null,
      icons: true,
      centered: true,
      grow: true,
      vertical: false,
      prevIcon: false,
      nextIcon: false,
      right: false,
      tabs: 5,

      tabs: [
        { id: 1, name: "NewsFeed",  route: `/`,           icon: "home"      ,title: "뉴스피드"},
        { id: 2, name: "Location",  route: `/catList`,    icon: "near_me"   ,title: "내 근처"},
        { id: 3, name: "AddPost",   route: `/addpost`,    icon: "add_box"   ,title: "글 추가"},
        { id: 4, name: "DashBoard", route: `/dashboard`,  icon: "dashboard" ,title: "대시보드"},
        { id: 5, name: "MyProfile", route: `/myProfile`,  icon: "person"    ,title: "내 정보"},
        // { id: 5, name: "TimeLine", route: `/user/${this.id}` }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.your-class{
  background-color: white;
}
</style>