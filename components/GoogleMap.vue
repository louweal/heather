<template>
  <div>
    <div class="map-container">
      <div id="map" ref="map" class="map">hello</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: false,
    };
  },

  mounted() {
    this.initMap();
  },

  methods: {
    async initMap() {
      // The location of Uluru
      const position = { lat: 52.16869, lng: 4.47094 };
      // Request needed libraries.
      //@ts-ignore
      const { Map } = await google.maps.importLibrary("maps");
      const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

      // The map, centered at Uluru
      this.map = new Map(this.$refs["map"], {
        zoom: 16,
        center: position,
        mapId: "f7886dcdb440711",
      });

      const iconBase = "https://heather.codesparks.nl/";
      const pins = {
        green: iconBase + "pin-green.png",
        orange: iconBase + "favicon.png",
      };

      // The marker, positioned at Uluru
      const marker = new google.maps.Marker({
        map: this.map,
        position: position,
        title: "Leiden",
        icon: pins.green,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.map-container {
  z-index: 3;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 40vh;
  width: 100vw;

  @include media-breakpoint-up(md) {
    left: auto;
    top: 0;
    right: 0;
    min-height: 100vh;
    width: 50vw;
  }
}

.map {
  min-height: 40vh;

  @include media-breakpoint-up(md) {
    min-height: 100vh;
  }
}
</style>
