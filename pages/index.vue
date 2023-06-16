<template>
  <main>
    <hero />

    <section id="about">
      <div class="container-xl">
        <div class="row justify-content-center text-center" data-aos="fade-up-scale">
          <div class="col-12 col-md-8">
            <h2 class="lh-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque veritatis, hic ullam eum temporibus rem ducimus officiis.
            </h2>
          </div>
          <div class="col-12 col-md-10 fs-md">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem expedita velit consectetur quaerat quam non iste fugit culpa
              eveniet voluptatum. Hic deleniti itaque temporibus unde quaerat sunt consequatur laborum animi.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="roadmap">
      <div class="container-xl">
        <div class="row gy-4">
          <div class="d-none d-md-block col-md-4">
            <div data-aos="fade-up-scale" class="h-100">
              <sticky>
                <div>
                  <badge> Versions </badge>

                  <roadmap />
                </div>
              </sticky>
            </div>
          </div>

          <div class="col-12 col-md-8">
            <div data-aos="fade-up-scale">
              <badge>Hello Future</badge>

              <h2>On the road to a sustainable planet</h2>

              <div class="fs-md">
                <p>
                  We believe that transparency is key to building a successful business. That's why we're excited to share with you our
                  vision for the future, and the steps we're taking to get there.
                </p>

                <p>
                  The roadmap below shows the key milestones and initiatives as we work to bring our products and services to market. We
                  want you to be a part of this journey, and to share in our excitement as we build something truly great. So, whether
                  you're an investor, a neighbor, or just someone who's interested in what we're doing, we invite you to join us on this
                  journey.
                </p>
              </div>

              <p xxxdata-aos="fade">
                <nuxt-link :to="{ hash: '#contact' }" class="fw-bold text-primary"
                  >Contact us to join our mission<i class="ps-1 bi bi-arrow-right"></i
                ></nuxt-link>
              </p>
            </div>

            <div class="row gy-2 mt-2 border-top" id="v01" data-aos="fade-up-scale">
              <span class="font-small fw-light">v0.1</span>

              <p>The pre-hackathon phase</p>

              <div class="col-12 col-lg-6">
                <h4>Ideating</h4>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, animi in beatae hic cumque aspernatur temporibus pariatur
                  alias veniam dolore optio, ratione provident sapiente voluptatibus reprehenderit necessitatibus quis error totam!
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>A dive into smart contracts</h4>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta veniam sed beatae, minima, fuga vero placeat omnis porro
                  expedita possimus dolor tempore quod quasi ea aspernatur. Dolorem deleniti temporibus in!
                </p>
              </div>
            </div>
            <div class="row gy-2 mt-2 border-top" id="v02" data-aos="fade-up-scale">
              <span class="font-small fw-light">v0.2</span>

              <p>The first week of the hackathon</p>

              <div class="col-12 col-lg-6">
                <h4>Front-end development</h4>

                <p>Designed and developed front-end from scratch, using bootstrap, Vue and nuxt.</p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Survey</h4>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, quibusdam quaerat? Rerum distinctio cum est officiis
                  consectetur, error harum mollitia ratione doloribus, ipsa perspiciatis, repudiandae culpa sint non qui quis.
                </p>
              </div>
            </div>
            <div data-aos="fade-up-scale">
              <div class="row gy-2 mt-2 border-top" id="v03">
                <span class="font-small fw-light">v0.3</span>

                <p>...</p>

                <div class="col-12 col-lg-6">
                  <h4>Dummy dataset</h4>

                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores sapiente quo architecto corrupti ipsum iste harum
                    distinctio deserunt voluptatem vel reiciendis incidunt, ratione blanditiis porro obcaecati necessitatibus, rerum magni
                    libero?
                  </p>
                </div>

                <div class="col-12 col-lg-6">
                  <h4>Data storage</h4>

                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis provident, mollitia ullam ex consectetur reiciendis,
                    aspernatur alias voluptatum sapiente veniam adipisci numquam totam similique? Voluptatem, inventore et! Sint, eaque
                    aliquid.
                  </p>
                </div>
              </div>
            </div>
            <div data-aos="fade-up-scale">
              <div class="row gy-2 mt-2 border-top" id="v04">
                <span class="font-small fw-light">v0.4</span>

                <p>...</p>

                <div class="col-12 col-lg-6">
                  <h4>Borrow contract</h4>

                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quibusdam nesciunt odit distinctio, assumenda facere
                    sint deleniti omnis obcaecati perspiciatis. Reprehenderit totam magni ipsam aperiam nostrum amet saepe in id?
                  </p>
                </div>

                <div class="col-12 col-lg-6">
                  <h4>HashPack intergration</h4>

                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolor quibusdam nesciunt odit distinctio, assumenda facere
                    sint deleniti omnis obcaecati perspiciatis. Reprehenderit totam magni ipsam aperiam nostrum amet saepe in id?
                  </p>
                </div>
              </div>
            </div>

            <div class="row gy-2 mt-2 border-top" id="v05" data-aos="fade-up-scale">
              <span class="font-small fw-light">v0.5</span>

              <p>Break</p>

              <div class="col-12 col-lg-6">
                <h4>Pitch video</h4>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita reiciendis eius mollitia tempore dolore provident modi
                  facere repellat. Laboriosam explicabo praesentium aspernatur perferendis labore eum accusamus nesciunt recusandae
                  voluptatum harum.
                </p>
              </div>
              <div class="col-12 col-lg-6">
                <h4>Project description</h4>

                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, impedit consectetur totam sapiente libero cumque ad
                  dolores reprehenderit laborum repellat nostrum, cum rerum alias ipsa dolor modi provident facilis quibusdam!
                </p>
              </div>
            </div>
            <div class="row gy-2 mt-2 border-top" id="v06" data-aos="fade-up-scale">
              <span class="font-small fw-light">v0.6+</span>

              <p>We have exiting plans for the (near) future!</p>

              <div class="col-12 col-lg-6">
                <h4>Multilanguage support</h4>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita reiciendis eius mollitia tempore dolore provident modi
                  facere repellat. Laboriosam explicabo praesentium aspernatur perferendis labore eum accusamus nesciunt recusandae
                  voluptatum harum.
                </p>
              </div>
              <div class="col-12 col-lg-6">
                <h4>Centralized back-end</h4>

                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, impedit consectetur totam sapiente libero cumque ad
                  dolores reprehenderit laborum repellat nostrum, cum rerum alias ipsa dolor modi provident facilis quibusdam!
                </p>
              </div>
              <div class="col-12 col-lg-6">
                <h4>Email services</h4>

                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore, impedit consectetur totam sapiente libero cumque ad
                  dolores reprehenderit laborum repellat nostrum, cum rerum alias ipsa dolor modi provident facilis quibusdam!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="contact">
      <div class="container-xl">
        <div class="py-4 px-2 text-center text-white bg-primary rounded">
          <div class="row justify-content-center" data-aos="fade">
            <div class="col-12 col-md-10">
              <h3 class="text-white">Let's connect</h3>

              <p>We're excited to connect with you. Got a question, need some help, or just want to say hi? Drop us a message!</p>

              <div class="d-flex justify-content-center">
                <nuxt-link to="/contact" class="btn btn-light"> <i class="bi bi-envelope me-2"></i> Send message </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script></script>
<style></style>
