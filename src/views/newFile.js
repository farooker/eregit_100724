// const name = ref('');
// const selectedChips = ref([]);
// const chips = ['Chip 1', 'Chip 2', 'Chip 3'];
// this.panel = ['foo', 'bar', 'baz']
// const items = [
//   { header: 'Panel 1', content: 'Content 1', checked: false },
//   { header: 'Panel 2', content: 'Content 2', checked: false },
//   // Add more items as needed
// ];
// const removeChip = (index) => {
//   console.log(index);
//   //selectedChips.value.splice(index, 1);
// };
export default {
data() {
return {
panel: [],
};
},
methods: {
all() {
this.panel = ['foo', 'bar', 'baz'];
},
none() {
this.panel = [];
},
},
};
