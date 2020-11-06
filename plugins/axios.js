export default function ({ $axios }) {
  $axios.onError((error) => {
    return { error, data: {} }
  })
}
