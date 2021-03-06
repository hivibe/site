import Mailchimp from "mailchimp-api-v3";
import { NextApiRequest, NextApiResponse } from "next";

const mailchimp = new Mailchimp(process.env.mailchimp || "");

const run = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email_address, first_name, source } = req.body;

  try {
    const results = await mailchimp.post(
      `/lists/${process.env.list_id}/members`,
      {
        source,
        email_address,
        first_name,
        status: "subscribed",
      }
    );
    return res.json(results);
  } catch (e) {
    return res.json(e);
  }
};

export default run;
