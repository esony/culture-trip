/**
 * http://open-api.myhelsinki.fi/doc#/v1places/listAll
 */

type Location = {
  id: string
  name: {
    fi: string
    en: string
    sv: string
    zh: string
  }
  source_type: any
  info_url: string
  modified_at: string
  location: {
    lat: number
    lon: number
    address: {
      street_address: string
      postal_code: string
      locality: string
    }
  }
  description: {
    intro: string
    body: string
    images: {
      url: string
      copyright_holder: string
      license_type: any
    }[]
  }
  tags: {
    id: string
    name: string
  }[]

  opening_hours: {
    hours: {
      weekday_id: number
      opens: {
        hours: number
        minutes: number
        seconds: number
      }
      closes: {
        hours: number
        minutes: number
        seconds: number
      }
      open24h: true
    }[]
    openinghours_exception: string
  }
}

export default Location
