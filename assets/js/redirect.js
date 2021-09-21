const form = document.querySelector('form');
const input = document.querySelector('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = document.querySelector('button');
  if (input.value !== 'alfateam2021developer') {
    input.classList.add('wrongpass');
    input.placeholder = 'Pogrešan kod';
    input.value = '';
  } else {
    localStorage.setItem('alfaTeamCode', 'true');
    const time_now = new Date().getTime();
    localStorage.setItem('alfaTeamSession', time_now);
    return (window.location.href = '/index.html');
  }
});
