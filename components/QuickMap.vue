<template>
  <div class="map-container">
    <div id="map" ref="map" class="map rounded"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.initMap();
  },

  props: {
    marker: {
      type: [Array, Object],
      default: () => {},
    },
  },

  methods: {
    getCenter() {
      return { lat: this.marker.location.lat, lng: this.marker.location.lng };
    },

    async initMap() {
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");

      this.$map = new Map(this.$refs["map"], {
        zoom: 16,
        center: this.getCenter(),
        mapId: "f7886dcdb440711",
        disableDefaultUI: true,
      });

      const marker = new google.maps.Marker({
        map: this.$map,
        position: this.marker.location,
        title: "location",
        icon: "https://heather.codesparks.nl/pin-primary.svg",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.map-container {
  z-index: 3;
  position: relative;
  min-height: 250px;
  width: 100%;
}

.map {
  min-height: 250px;
}
</style>
