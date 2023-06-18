<template>
  <main>
    <hero />

    <section id="about">
      <div class="container-xl">
        <div class="row justify-content-center text-center" data-aos="fade-up-scale">
          <div class="col-12 col-md-8">
            <h2 class="lh-sm">
              Heather is the first fully decentralized peer-to-peer sharing platform and functions without any mandatory subscriptions or
              commissions.
            </h2>
          </div>
          <div class="col-12 col-md-10 fs-md">
            <p>
              Instead, people can ask a deposit when lending an item. The deposits are stored safely on the Hedera network and are returned
              automatically when the item is returned to its owner. We also encourage reviewing and we make sure the reviews are reliable
              using smart contracts.
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
                  <badge> Roadmap </badge>

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

              <p>
                <nuxt-link :to="{ hash: '#contact' }" class="fw-bold text-primary"
                  >Contact us to join our mission<i class="ps-1 bi bi-arrow-right"></i
                ></nuxt-link>
              </p>
            </div>

            <!-- <div class="row gy-2 mt-2 border-top" id="v01" data-aos="fade-up-scale">
              <span class="font-sm fw-light">v0.1</span>

              <p>The pre-hackathon phase</p>

              <div class="col-12 col-lg-6">
                <h4>Ideating</h4>

                <p>
                  The idea behind Heather came from our drive to build a dApp that encourages sustainable behavior. We sought for an idea
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>A dive into smart contracts</h4>

                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta veniam sed beatae, minima, fuga vero placeat omnis porro
                  expedita possimus dolor tempore quod quasi ea aspernatur. Dolorem deleniti temporibus in!
                </p>
              </div>
            </div> -->
            <div class="row gy-2 mt-2 border-top" id="v01" data-aos="fade-up-scale">
              <span class="font-sm fw-light">26 May — 2 June</span>

              <p>And off we go!</p>

              <div class="col-12 col-lg-6">
                <h4>Front-end development</h4>

                <p>We designed and developed a front-end from scratch, using bootstrap, vue and nuxt.</p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Survey</h4>

                <p>
                  We created and distributed <a href="https://leidenuniv.eu.qualtrics.com/jfe/form/SV_afc0LOwmULSfa0m">a survey</a> to
                  investigate how interested people are to borrow, lend or rent things.
                </p>
              </div>

              <div class="col-12 col-lg-6">
                <h4>Google maps</h4>

                <p>We integrated Google Maps to make it easier for users to find items in their own neighborhood.</p>
              </div>
            </div>
            <div data-aos="fade-up-scale">
              <div class="row gy-2 mt-2 border-top" id="v03">
                <span class="font-sm fw-light">2 June — 9 June</span>

                <p>Still going strong in the second week!</p>

                <div class="col-12 col-lg-6">
                  <h4>Dummy dataset</h4>

                  <p>
                    We created a dataset with dummy data. We took pictures of items in our own (and our friends) households. And we created
                    dummy user accounts including testnet wallets.
                  </p>
                </div>

                <div class="col-12 col-lg-6">
                  <h4>Data storage</h4>

                  <p>
                    We decided to store all data on the Hedera testnet, using a seperate smart contract for storage (Storage.sol). While
                    this is unconventional, it saved us lot of time and resources because now we could build the dApp as a front-end only
                    (static) website. And it also gave us the opportunity to get more experience with writing smart contracts on Hedera.
                  </p>
                </div>
              </div>
            </div>
            <div data-aos="fade-up-scale">
              <div class="row gy-2 mt-2 border-top" id="v03">
                <span class="font-sm fw-light">9 June — 19 June</span>

                <p>The deadline is getting closer and closer...</p>

                <div class="col-12 col-lg-6">
                  <h4>Borrow contract</h4>

                  <p>
                    Finally, we created all borrow functionality. We wrote smart contract in Solidity and interacted with it using the
                    Hedera Javascript SDK.
                  </p>
                </div>

                <div class="col-12 col-lg-6">
                  <h4>HashPack integration</h4>

                  <p>We integrated Hashpack to make it easy to connect Hedera wallets to our dApp.</p>
                </div>
              </div>
            </div>

            <div class="row gy-2 mt-2 border-top" id="v05" data-aos="fade-up-scale">
              <span class="font-sm fw-light">19 June — 26 June</span>

              <p>
                Although I spend most of this week on a well-deserved holiday in my own country, I also managed to finish some crucial
                deliverables!
              </p>

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
              <span class="font-sm fw-light">Judging phase</span>

              <p>
                Just biting my nails and hoping for some luck! ☘︎ And ofcourse, waiting until I can continue with the development of
                Heather!^^
              </p>
            </div>

            <div class="row gy-2 mt-2 border-top" id="v07" data-aos="fade-up-scale">
              <span class="font-sm fw-light">8 July — the near future</span>

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
