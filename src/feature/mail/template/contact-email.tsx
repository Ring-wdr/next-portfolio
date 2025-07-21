import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactEmailProps {
  userName: string;
  content: string;
}

export const ContactEmail = ({ userName, content }: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>New message from your portfolio site</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>New Message from Contact Form</Heading>
        <Text style={paragraph}>
          You&apos;ve received a new message from {userName}.
        </Text>
        <Hr style={hr} />
        <Section>
          <Text style={paragraph}>{content}</Text>
        </Section>
        <Hr style={hr} />
        <Text style={footer}>Sent from your Next.js Portfolio</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #f0f0f0",
  borderRadius: "4px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
  textAlign: "center" as const,
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  padding: "0 20px",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 20px",
};
