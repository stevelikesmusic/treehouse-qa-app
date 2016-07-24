export default {
  toggleDisableSubmit(event, submitId: string) {
    let submit = document.getElementById(submitId)
    if (!!event.target.value) {
      submit.removeAttribute('disabled')
    } else {
      submit.setAttribute('disabled', 'disabled')
    }
  }
}