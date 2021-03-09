<template>
  <v-container>
    <v-col cols="12" sm="4" class="mx-auto my-auto">
      <v-card class="mx-auto" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              Hello!
            </v-list-item-title>
            <p>
              This is just a welcome page there is nothing intresting here.
              Check drawer on the left to explore or click the button below to
              check out the code
            </p>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn
            href="https://github.com/Kelek28/apicrypto-v2"
            target="blank"
            rounded
            color="primary"
          >
            <v-icon> mdi-github </v-icon>
            Get code
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>