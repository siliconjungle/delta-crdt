import ds from '../delta-state'

describe('ds', () => {
  it('Create', () => {
    const x = ds.create([0, 'james'], 50)
    expect(x).toMatchObject({
      agents: {
        james: [0, 50],
      },
      version: [0, 'james'],
    })
  })
  it('Get delta', () => {
    const x = {
      agents: {
        james: [0, 50],
      },
      version: [0, 'james'],
    }
    expect(ds.getDelta(x, 'james', 70)).toBe(20)
    expect(ds.getDelta(x, 'james', 25)).toBe(-25)
    expect(ds.getDelta(x, 'james', 50)).toBe(0)
  })
  it('Should apply delta', () => {
    const x = {
      agents: {
        james: [0, 50],
      },
      version: [0, 'james'],
    }
    expect(ds.shouldApplyDelta(x, [0, 'steve'])).toBe(true)
    expect(ds.shouldApplyDelta(x, [0, 'james'])).toBe(false)
    expect(ds.shouldApplyDelta(x, [1, 'james'])).toBe(true)
  })
  it('Should set', () => {
    const x = {
      agents: {
        james: [0, 50],
      },
      version: [0, 'james'],
    }
    expect(ds.shouldSet(x, [0, 'steve'])).toBe(true)
    expect(ds.shouldSet(x, [0, 'james'])).toBe(false)
    expect(ds.shouldSet(x, [1, 'james'])).toBe(true)
  })
  it('Apply delta', () => {
    const x = {
      agents: {
        james: [0, 50],
      },
      version: [0, 'james'],
    }
    ds.applyDelta(x, [1, 'james'], 70)
    expect(x).toMatchObject({
      agents: {
        james: [1, 120],
      },
      version: [1, 'james'],
    })
    ds.applyDelta(x, [2, 'james'], -50)
    expect(x).toMatchObject({
      agents: {
        james: [2, 70],
      },
      version: [2, 'james'],
    })
  })
  it('Set', () => {
    const x = {
      agents: {
        james: [0, 50],
      },
      version: [0, 'james'],
    }
    ds.set(x, [1, 'james'], 70)
    expect(x).toMatchObject({
      agents: {
        james: [1, 70],
      },
      version: [1, 'james'],
    })
  })
})
