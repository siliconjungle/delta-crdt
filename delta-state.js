const create = (version, value) => {
  const [seq, agentId] = version
  return {
    agents: {
      [agentId]: [seq, value],
    },
    version,
  }
}

const getDelta = (ds, agentId, value) => value - ds.agents[agentId][1]

const shouldApplyDelta = (ds, [seq, agentId]) =>
  ds.agents[agentId] === undefined || seq > ds.agents[agentId][0]

const applyDelta = (ds, [seq, agentId], value) => {
  ds.agents[agentId] = [seq, value]
}

const shouldSet = ({ version: [seq, agentId] }, [seq2, agentId2]) =>
  seq2 > seq || (seq2 === seq && agentId2 > agentId)

const set = (ds, uid) => {
  ds.version = uid
}

export default {
  create,
  getDelta,
  shouldApplyDelta,
  applyDelta,
  shouldSet,
  set,
}
