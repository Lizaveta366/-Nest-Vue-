<template>
  <div class="container">
    <h1>Load Testing Application</h1>

    <div class="controls">
      <div class="input-group">
        <label>Number of Requests:</label>
        <input
          type="number"
          v-model.number="requestsCount"
          min="1"
          max="1000"
        />
      </div>

      <div class="input-group">
        <label>Delay between requests (ms):</label>
        <input
          type="number"
          v-model.number="delayMs"
          min="0"
          max="5000"
        />
      </div>

      <button @click="startLoadTest" :disabled="isTesting">
        {{ isTesting ? 'Testing...' : 'Start Load Test' }}
      </button>
    </div>

    <div class="results">
      <div class="stats">
        <div>Total: {{ stats.total }}</div>
        <div>Success: {{ stats.successful }}</div>
        <div>Errors: {{ stats.errors }}</div>
        <div>Time: {{ elapsedTime }}s</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      requestsCount: 10,
      delayMs: 100,
      isTesting: false,
      stats: { total: 0, successful: 0, errors: 0 },
      startTime: null
    };
  },
  computed: {
    elapsedTime() {
      if (!this.startTime) return 0;
      return ((Date.now() - this.startTime) / 1000).toFixed(2);
    }
  },
  methods: {
    async startLoadTest() {
      this.isTesting = true;
      this.stats = { total: 0, successful: 0, errors: 0 };
      this.startTime = Date.now();

      for (let i = 0; i < this.requestsCount; i++) {
        await this.makeRequest(i);
        if (this.delayMs > 0) {
          await new Promise(resolve => setTimeout(resolve, this.delayMs));
        }
      }

      this.isTesting = false;
    },

    async makeRequest() {
      try {
        await axios.get('http://localhost:3000/items?limit=5');
        this.stats.total++;
        this.stats.successful++;
      } catch (error) {
        this.stats.total++;
        this.stats.errors++;
      }
    }
  }
};
</script>

<style>
.container { max-width: 600px; margin: 0 auto; padding: 20px; }
.controls { margin-bottom: 20px; }
.input-group { margin-bottom: 10px; }
input { width: 100%; padding: 5px; }
button { padding: 10px 20px; background: #007bff; color: white; border: none; cursor: pointer; }
button:disabled { background: #ccc; }
.stats { display: flex; gap: 20px; }
</style>
'@