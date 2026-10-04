import captionsRaw from './assets/photo/captions.txt?raw'

// Every image in assets/photo named YYYY-MM-DD(.jpg|.jpeg|.png|.webp), optional suffix like 2025-03-14-2
const files = import.meta.glob('./assets/photo/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' })

const captions = Object.fromEntries(
  captionsRaw.split('\n')
    .filter(line => line.includes('|'))
    .map(line => {
      const i = line.indexOf('|')
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()]
    })
)

export const photos = Object.entries(files)
  .map(([path, src]) => {
    const name = path.split('/').pop().replace(/\.\w+$/, '')
    const [year, month, day] = name.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return {
      src,
      name,
      year,
      date,
      title: date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      caption: captions[name] ?? '',
    }
  })
  .filter(p => {
    if (isNaN(p.date)) console.warn(`Nama foto harus YYYY-MM-DD: ${p.name}`)
    return !isNaN(p.date)
  })
  .sort((a, b) => a.date - b.date || a.name.localeCompare(b.name))
