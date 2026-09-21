import { ArrowUpRight } from "lucide-react";
import { SOCIETY } from "../data";

export default function Committee({ members }) {
  return (
    <section id="committee" className="section">
      <div className="container">
        <div className="head">
          <h2>Built by students</h2>
          <p>
            The society is run by students who want to build a stronger community
            around enterprise technology at Manchester.
          </p>
        </div>

        <ul className="committee__list">
          {members.map((member) => (
            <li className="role" key={member.role}>
              <h3>{member.role}</h3>
              <p>
                {member.focus}
                {member.name && <strong>{member.name}</strong>}
              </p>
            </li>
          ))}
        </ul>

        <div className="join" id="join">
          <div>
            <h3>Interested in IBM Z?</h3>
            <p>
              Membership is open to every course and every level of experience. Join
              through the Students' Union to get event updates and access to
              everything we run.
            </p>
          </div>
          <a className="btn btn--primary" href={SOCIETY.joinUrl}>
            Join the society
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
